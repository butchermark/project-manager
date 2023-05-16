import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { UserEntity } from '../user/models/user.enity';
import { Users } from '../user/models/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signinLocal(dto: AuthDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const hashedPassword = await crypto
      .createHmac('sha256', process.env.USER_SALT)
      .update(dto.password)
      .digest('base64');
    dto.password = hashedPassword;

    if (dto.password !== user.password || user.email !== dto.email)
      throw new UnauthorizedException('Password or username does not match');

    const updatedUser = await this.userRepository.save({
      ...user,
      lastLogin: new Date(),
    });

    delete updatedUser.password;
    return {
      accesstoken: this.jwtService.sign({ ...updatedUser }),
      user: updatedUser,
    };
  }

  /*
  async getNamebyId(id: string): Promise<any> {
    const users = await this.userRepository.findOne({ where: { id } });
    return users;
  }
  */
  async getUsers(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async validateUser(payload: AuthDto): Promise<AuthDto> {
    if (payload.isAdmin === true) {
      return payload;
    } else {
      throw new UnauthorizedException('User has no permission');
    }
  }
}
