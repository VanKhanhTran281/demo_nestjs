/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { SignInDto } from './dto/sign_in.dto';
// import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { name, password } = signInDto;
    const user = await this.usersService.findOne(name);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Tạo payload cho JWT
    const payload = {id: user.id, username: user.name,  phone: user.phone.map(phone => ({ company: phone.company, value: phone.value })) };
    // Tạo JWT
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
  //Phan ma hoa mat khau khi tao moi
    // async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    //   const { name, password } = signInDto;
    //   const user = await this.usersService.findOne(name);
    //   if (!user || !compareSync(password, user.password)) {
    //     throw new UnauthorizedException('Invalid credentials');
    //   }
    //   // Tạo payload cho JWT
    //   const payload = { username: user.name, sub: user.id, phone: user.phone };
    //   // Tạo JWT
    //   const access_token = this.jwtService.sign(payload);
    //   return { access_token };
    // }
}