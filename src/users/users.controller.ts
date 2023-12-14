/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, NotFoundException, Param, Patch } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User, UserAdd } from './users.entity';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
  @Post()
  createUser(@Body() createUser: UserAdd): Promise<UserAdd> {
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
