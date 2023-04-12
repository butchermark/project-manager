import { ApiProperty } from '@nestjs/swagger';
import { Projects } from 'src/project/models/project.interface';
import { Users } from 'src/user/models/user.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  @Column({ default: 'yxc', name: 'name' })
  name: string;
  @Column({ default: 'yxc', name: 'description' })
  description: string;
  @Column({ default: 'yxc', name: 'status' })
  status: string;
  //@Column({ default: [], name: 'user' })
  //user: Users;
  //@Column({ default: [], name: 'project' })
  //project: Projects;
}
