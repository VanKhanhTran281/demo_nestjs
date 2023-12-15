/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone, PhoneAdd } from './phone.entity';


@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}

  getPhone(): Promise<Phone[]> {
    return this.phoneRepository.find();
  }
  createPhone(createPhone: PhoneAdd): Promise<Phone> {
    const phone = this.phoneRepository.create(createPhone);
    return this.phoneRepository.save(phone);
  }
  async updatePhone(phone_id: number, updatePhone: Phone): Promise<Phone> {
    const phone = await this.phoneRepository.findOne({ where: { phone_id } });
    if (!phone) {
      throw new NotFoundException('Phone not found');
    }
    Object.assign(phone, updatePhone);
    await this.phoneRepository.save(phone);
    return phone;
  }
  
  async deletePhone(phone_id: number): Promise<void> {
    const result = await this.phoneRepository.delete(phone_id);
    if (result.affected === 0) {
      throw new NotFoundException('Phone not found');
    }
  }
}
