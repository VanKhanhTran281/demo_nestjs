/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { Phone } from './phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}