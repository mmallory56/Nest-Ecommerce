import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
   
    private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(password,username);
    const user = await this.authService.validateUser(username, password);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    
    return {user};
  }
}
