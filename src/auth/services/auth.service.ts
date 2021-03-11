import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/Models/DTOs/UserDto';

import { UsersService } from 'src/users/users.service';

const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  //sign up with username email password.
  async signUp(user: any) {
    const newUser = await this.usersService.newUser(user);
    return newUser;
  }
  //Validate User via user name and password
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    const compare = await bcrypt.compareSync(pass, user.password);
    if (compare) {
      return user;
    } else {
      return null;
    }
  }
  //Google Valication
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
  //Web Token Login
  async login(user: any) {
    console.log(user._id)
    const userDto: UserDto = {
      username: user.name,
      email: user.email,
      isAdmin: false,
    };

    const payload = userDto;
    const token = await this.jwtService.sign(payload);
    userDto.token = token;
    return userDto;
  }
}
