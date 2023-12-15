/* eslint-disable prettier/prettier */

import { Controller, Delete, Get, NotFoundException, Param, Patch } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { Phone, PhoneAdd } from './phone.entity';


@Controller('phone')
export class PhoneController {
    constructor(private readonly phoneService: PhoneService) { }

    @Get()
    getPhone(): Promise<Phone[]> {
        return this.phoneService.getPhone();
    }
    @Post()
    createPhone(@Body() createPhone: PhoneAdd): Promise<Phone> {
        try {
            return this.phoneService.createPhone(createPhone);
        } catch (error) {
            throw new NotFoundException('Phone not found');
        }

    }
    @Patch(':phone_id')
    async updatePhone(@Param('phone_id') phone_id: number, @Body() updatePhone: Phone): Promise<Phone> {
        try {
            const update = await this.phoneService.updatePhone(phone_id, updatePhone);
            return update;
        } catch (error) {
            throw new NotFoundException('Phone not found');
        }
    }

    @Delete(':phone_id')
    async deletePhone(@Param('phone_id') id: number): Promise<void> {
        try {
            await this.phoneService.deletePhone(id);
        } catch (error) {
            throw new NotFoundException('Phone not found');
        }
    }
}
