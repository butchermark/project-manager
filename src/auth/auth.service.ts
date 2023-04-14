import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import { UserEntity } from 'src/user/models/user.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/user/models/user.interface';

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
        name: dto.username,
        password: dto.password,
        isAdmin: dto.isAdmin,
      },
    });
    if (!user) throw new UnauthorizedException('User does not exists');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Password does not match');
    return this.signUser(user.name, user.password, user.isAdmin);
  }

  /*
  async getNamebyId(id: string): Promise<any> {
    const users = await this.userRepository.findOne({ where: { id } });
    return users;
  }
  */
  async getNamebyId(): Promise<Users[]> {
    return this.userRepository.find();
  }

  signUser(username: string, password: string, isAdmin: boolean) {
    return {
      accesstoken: this.jwtService.sign({
        sub: username,
        password,
        isAdmin: isAdmin,
      }),
    };
  }
}
