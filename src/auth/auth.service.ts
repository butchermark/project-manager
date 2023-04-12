import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import * as users from '../users/users.json';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signinLocal(dto: AuthDto) {
    const user = users.find((_user) => _user.username === dto.username);
    if (!user) throw new UnauthorizedException('User does not exists');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Password does not match');
    return this.signUser(user.id, user.username, 'user');
  }

  signUser(userId: number, username: string, type: string) {
    return {
      accesstoken: this.jwtService.sign({ sub: userId, username, type: type }),
    };
  }
}
