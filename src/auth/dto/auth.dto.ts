import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  lastLogin: Date;
}
