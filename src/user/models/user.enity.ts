import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from 'src/project/models/project.entity';
import { TaskEntity } from 'src/task/models/task.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  @Column('varchar', { default: 'asd', name: 'name' })
  name: string;
  @Column('varchar', { default: 'asd', name: 'email' })
  email: string;
  @Column('varchar', { default: 'asd', name: 'password' })
  password: string;
  @Column('boolean', { default: false, name: 'isAdmin' })
  isAdmin: boolean;
  @Column('boolean', { default: false, name: 'isSuspended' })
  isSuspended: boolean;
  @Column('date', { default: '2000-01-01', name: 'lastLogin' })
  lastLogin: Date;

  @OneToMany(() => ProjectEntity, (project) => project.user, { cascade: true })
  project: ProjectEntity;

  @OneToMany(() => TaskEntity, (task) => task.user, { cascade: true })
  tasks: TaskEntity[];

  @ManyToMany(() => ProjectEntity, (projects) => projects.users)
  @JoinTable()
  projects: ProjectEntity[];
}
