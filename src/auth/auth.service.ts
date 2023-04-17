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
        id: dto.id,
        name: dto.name,
        password: dto.password,
        isAdmin: dto.isAdmin,
      },
    });
    if (!user) throw new UnauthorizedException('User does not exists');
    if (user.password !== dto.password && user.name !== dto.name)
      throw new UnauthorizedException('Password or username does not match');
    return this.signUser(user);
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

  async validateUser(payload: AuthDto): Promise<AuthDto> {
    if (payload.isAdmin === true) {
      return payload;
    } else {
      throw new UnauthorizedException('User has no permission');
    }
  }

  signUser({ id, name, password, isAdmin }: AuthDto) {
    return {
      accesstoken: this.jwtService.sign({
        sub: name,
        id: id,
        password: password,
        isAdmin: isAdmin,
      }),
    };
  }
}
