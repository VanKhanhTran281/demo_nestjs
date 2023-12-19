/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, NotFoundException, Param, Patch } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
  @Get(':id')
  async getUserWithPhones(@Param('id') id: number): Promise<User> {
    try {
      const user = await this.userService.getUserWithPhones(id);
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  @Post()
  createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUser);
  }
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() updateUser: User): Promise<User> {
    try {
      const updatedUser = await this.userService.updateUser(id, updateUser);
      return updatedUser; 
    } catch (error) {
      throw new NotFoundException('User not found');
    }  
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
