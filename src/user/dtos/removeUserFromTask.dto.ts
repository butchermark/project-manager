import { ApiProperty } from '@nestjs/swagger';

export class RemoveUserFromTaskDto {
  @ApiProperty()
  id: string;
}
