import { Tasks } from '../../task/models/task.interface';
import { Users } from '../../user/models/user.interface';

export interface Projects {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  users?: Users[];
  tasks?: Tasks[];
  manager?: Users;
}
