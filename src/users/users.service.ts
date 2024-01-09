/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.dto';
// import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // getUsers(): Promise<User[]> {
  //   return this.userRepository.find();
  // }
  async getUsers(page: number, pageSize: number): Promise<{ user: User[], totalPage: number, currentPage: number }> {
    const [user, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalPage = Math.ceil(total / pageSize);
    const currentPage = page;

    return { user, totalPage, currentPage };
  }
  async findOne(name: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { name },relations: ['phone'], });
    return user;
  }
  async getUserWithPhones(id: number): Promise<User> {
    const user = await this.userRepository.findOne(
      {
        where: { id },
        relations: ['phone'],
      }
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  //Phan ma hoa mat khau khi tao moi
    // createUser(createUser: CreateUserDto): Promise<User> {
    //   const { password } = createUser;
    //   const hashedPassword = hashSync(password, 10);
    //   const user = this.userRepository.create({ ...createUser, password: hashedPassword });
    //   return this.userRepository.save(user);
    // }
  createUser(createUser: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUser);
    return this.userRepository.save(user);
  }
  async updateUser(id: number, updateUser: User): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUser);
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
