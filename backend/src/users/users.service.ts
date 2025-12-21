import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }

    async findById(id: string) {
        return this.userModel.findById(id).exec();
    }

    async createUser(
        email: string,
        passwordHash: string,
        firstName: string,
        lastName: string,
    ) {
        const existing = await this.findByEmail(email);
        if (existing) throw new ConflictException('Email already in use');

        const created = await this.userModel.create({
            email: email.toLowerCase(),
            passwordHash,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
        });

        return created;
    }
    async updateRefreshToken(userId: string, refreshTokenHash: string | null) {
        await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash });
    }
}
