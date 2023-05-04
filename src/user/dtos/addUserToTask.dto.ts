import { ApiProperty } from '@nestjs/swagger';

export class AddUserToTaskDto {
  @ApiProperty()
  id: string;
}
