import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../../entities/user.entity';
import { ForgotPasswordSchema } from '../../entities/forgot-password.entity';
import { AuthModule } from '../auth/auth.module';

import { UserRepository } from '../../repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    // imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), MongooseModule.forFeature([{ name: 'ForgotPassword', schema: ForgotPasswordSchema }]), AuthModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule {}
