import { ApiProperty } from '@nestjs/swagger';
import { Tasks } from 'src/task/models/task.interface';
import { Users } from 'src/user/models/user.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class ProjectEntity {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  @Column({ default: 'qwe', name: 'name' })
  name: string;
  @Column({ default: 'qwe', name: 'status' })
  status: string;
  //@Column({ default: [], name: 'users' })
  //users: Users[];
  //@Column({ default: [], name: 'tasks' })
  //tasks: Tasks[];
  @Column({ default: 'qwe', name: 'manager' })
  manager: string;
}
