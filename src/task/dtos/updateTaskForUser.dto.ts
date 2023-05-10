import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskForUserDto {
  @ApiProperty()
  status: string;
  userId: string;
}
