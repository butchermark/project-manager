import { Tasks } from '../../task/models/task.interface';

export interface Users {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  tasks?: Tasks[];
}
