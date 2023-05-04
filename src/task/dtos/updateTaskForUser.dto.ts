import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskForUserDto {
  @ApiProperty()
  name: string;
  status: string;
  decsription: string;
  userId: string;
}
