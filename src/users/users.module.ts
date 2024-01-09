/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from './users.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,CaslAbilityFactory],
  exports: [UserService]
})
export class UserModule {}