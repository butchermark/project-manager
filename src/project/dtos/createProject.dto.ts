import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  name: string;
  status: string;
  decsription: string;
  userId: string;
}
