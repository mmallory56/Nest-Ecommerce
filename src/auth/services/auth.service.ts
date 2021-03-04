import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import bcrypt from 'bcrypt';
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
    console.log(user);
    const compare = await bcrypt.compare(pass, user.password);
    if (user && compare) {
     
      return user;
    }
    else{
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
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
