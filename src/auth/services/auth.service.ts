import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { resourceUsage } from 'node:process';
import { UserRoles } from 'src/users/enums/rolesEnum';
import { UserDto } from 'src/users/Models/DTOs/UserDto';
import { UserInterface } from 'src/users/Models/interfaces/UserInterface';

import { UsersService } from 'src/users/users.service';

const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
   
    private usersService:UsersService,
    private jwtService: JwtService,
  ) {}
  //sign up with username email password.
  async signUp(user: any) {
    const newUser = await this.usersService.newUser(user);
    return newUser;
  }
  //Validate User via user name and password
  async validateUser(username: string, pass: string): Promise<any> {
    console.log(pass,username)
    const user = await this.usersService.findOne(username);
    console.log(user)
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
  async login(user) {
    console.log(user.user)
    
    const payload ={
      email: user.user.email,
      username: user.user.name,
      role: user.user.role
    };
    console.log(payload)
    const token = await this.jwtService.sign(payload);
    
    return token;
  }
}
