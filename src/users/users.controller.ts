/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Query, NotFoundException, Param, Patch, ForbiddenException } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.dto';
import { createMongoAbility,MongoAbility } from '@casl/ability';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Controller('users')
export class UserController {private ability: MongoAbility;
  constructor(
      private readonly userService: UserService,
      private readonly abilityFactory: CaslAbilityFactory,
    ) {
      this.ability = createMongoAbility(); // Tạo một đối tượng MongoAbility mới
    }

  // @Get()
  // getUsers(): Promise<User[]> {
  //   return this.userService.getUsers();
  // }
  @Get()
  getUsers(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ): Promise<{ user: User[], totalPage: number, currentPage: number }> {
    const parsedPage = parseInt(page, 10);
    const parsedPageSize = parseInt(pageSize, 10);
    return this.userService.getUsers(parsedPage, parsedPageSize);
  }
  // @Get(':id')
  // async getUserWithPhones(@Param('id') id: number): Promise<User> {
  //   try {
  //     const user = await this.userService.getUserWithPhones(id);
  //     return user;
  //   } catch (error) {
  //     throw new NotFoundException('User not found');
  //   }
  // }
  @Get(':id')
  async getUserWithPhones(@Param('id') id: number): Promise<User> {
    try {
      const user = await this.userService.getUserWithPhones(id);
      // Sử dụng đối tượng ability để kiểm tra quyền truy cập vào thông tin người dùng
      if (this.ability.can('read',user, user.role.name)) {
        return user;
      } else {
        throw new ForbiddenException('Unauthorized');
      }
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
