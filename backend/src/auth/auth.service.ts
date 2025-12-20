import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
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

        // jwt
        const payload = {
            sub: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return { accessToken };
    }
}
