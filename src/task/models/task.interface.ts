import { Projects } from 'src/project/models/project.interface';
import { Users } from 'src/user/models/user.interface';

export interface Tasks {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  user?: Users;
  project?: Projects;
}
