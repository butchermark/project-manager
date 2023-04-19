import { Tasks } from 'src/task/models/task.interface';
import { UserEntity } from 'src/user/models/user.enity';
import { Users } from 'src/user/models/user.interface';

export interface Projects {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  users?: Users[];
  tasks?: Tasks[];
  manager?: Users;
}
