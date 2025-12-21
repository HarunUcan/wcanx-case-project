import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async register(email: string, password: string, firstName: string, lastName: string) {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.usersService.createUser(
            email,
            passwordHash,
            firstName,
            lastName,
        );

        return {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) throw new UnauthorizedException('Invalid credentials');

        const tokens = await this.getTokens(user._id.toString(), user.email, user.firstName, user.lastName);
        await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);

        return tokens;
    }

    async logout(userId: string) {
        // delete refresh token from db
        await this.usersService.updateRefreshToken(userId, null);
    }

    async refreshTokens(refreshToken: string) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'refreshSecret',
            });
        } catch (e) {
            throw new ForbiddenException('Access Denied');
        }

        const userId = payload.sub;
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshTokenHash) throw new ForbiddenException('Access Denied');

        const tokensMatch = await bcrypt.compare(refreshToken, user.refreshTokenHash);
        if (!tokensMatch) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user._id.toString(), user.email, user.firstName, user.lastName);
        await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);

        return tokens;
    }

    private async updateRefreshToken(userId: string, refreshToken: string) {
        const hash = await bcrypt.hash(refreshToken, 10);
        await this.usersService.updateRefreshToken(userId, hash);
    }

    private async getTokens(userId: string, email: string, firstName: string, lastName: string) {
        const payload = {
            sub: userId,
            email,
            firstName,
            lastName,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: (this.configService.get<string>('JWT_EXPIRES_IN') || '15m') as any,
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'refreshSecret',
                expiresIn: (this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d') as any,
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
