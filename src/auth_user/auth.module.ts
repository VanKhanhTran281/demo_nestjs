/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: '280102',
            signOptions: { expiresIn: '1h' }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }