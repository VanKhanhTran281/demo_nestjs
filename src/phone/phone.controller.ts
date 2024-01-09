/* eslint-disable prettier/prettier */

import { Controller, Delete, Get, Query, NotFoundException, Param, Patch } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { Phone } from './phone.entity';
import { CreatePhoneDto } from './dto/phone.dto';


@Controller('phone')
export class PhoneController {
    constructor(private readonly phoneService: PhoneService) { }

    @Get()
    getPhone(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ): Promise<{ phone: Phone[], totalPage: number, currentPage: number }> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const parsedPage = parseInt(page, 10);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const parsedPageSize = parseInt(pageSize, 10);
        // http://localhost:3000/phone?page=1&pageSize=3
        return this.phoneService.getPhone(parsedPage, parsedPageSize);
    }
    @Get(':phone_id')
    async getUserWithPhones(@Param('phone_id') id: number): Promise<Phone> {
        try {
            const user = await this.phoneService.getUserWithPhones(id);
            return user;
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }
    @Post()
    createPhone(@Body() createPhone: CreatePhoneDto): Promise<Phone> {
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
