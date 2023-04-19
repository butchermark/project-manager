import { UserEntity } from 'src/user/models/user.enity';

export class CreateProjectDto {
  name: string;
  status: string;
  decsription: string;
  userId: string;
}
