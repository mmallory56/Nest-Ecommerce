import { Controller, Get, HttpCode, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/services/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { EmailService } from './email/email.service';
import { request } from 'express';
import { User } from './users/Models/schema/user.schema';
import passport from 'passport';
import { AuthGuard } from '@nestjs/passport';
import { GoogleStrategy } from './auth/strategys/google.strategy';


//Main Controller with Common EndPoints
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}
  @Get()
  Hey(){
    return "Welcome Matthew"
  }
  //Sign Up

  @Post('signup')
  
  async signUp(@Request() req) {
    return this.authService.signUp(req.body.user);
  }
  //Login and validate User
  @Get('auth/login')
  //@UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    console.log(req.user)
    return "yes"
  }

  //View User Profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  //Test Sending Emails Sends
  @Post('email')
  async sendEmail() {
    return this.emailService.sendEmail();
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  loginGoogle(@Req() req) {
    return req;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
