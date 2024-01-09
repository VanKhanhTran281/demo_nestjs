/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone} from './phone.entity';
import { CreatePhoneDto } from './dto/phone.dto';


@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) { }

  async getPhone(page: number, pageSize: number): Promise<{ phone: Phone[], totalPage: number, currentPage: number }> {
    const [phone, total] = await this.phoneRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalPage = Math.ceil(total / pageSize);
    const currentPage = page;

    return { phone, totalPage, currentPage };
  }
  async getUserWithPhones(phone_id: number): Promise<Phone> {
    const phone = await this.phoneRepository.findOne(
      {
        where: { phone_id },
        relations: ['user'],
      }
    );
    if (!phone) {
      throw new NotFoundException('User not found');
    }
    return phone;
  }
  createPhone(createPhone: CreatePhoneDto): Promise<Phone> {
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
