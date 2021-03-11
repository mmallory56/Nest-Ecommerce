import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthService } from './auth/services/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { EmailService } from './email/email.service';
import { AuthGuard } from '@nestjs/passport';


//Main Controller with Common EndPoints
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}
  @Get()
  Hey() {
    return 'Welcome Matthew';
  }
  //Sign Up

  @Post('signup')
  async signUp(@Request() req) {
    return this.authService.signUp(req.body.user);
  }
  //Login and validate User
 
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
   
    return this.authService.login(req.user);
  }

  //View User Profile
  @UseGuards(AuthGuard('jwt'))
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
