import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectTaskDto {
  @ApiProperty()
  name: string;
  description: string;
  status: string;
}
