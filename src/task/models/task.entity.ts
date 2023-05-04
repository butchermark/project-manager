import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from 'src/project/models/project.entity';
import { UserEntity } from 'src/user/models/user.enity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  @Column('varchar', { default: 'yxc', name: 'name' })
  name: string;
  @Column('varchar', { default: 'yxc', name: 'description' })
  description: string;
  @Column('varchar', { default: 'yxc', name: 'status' })
  status: string;
  @Column('boolean', { default: false, name: 'isArchived' })
  archived: boolean;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinTable()
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinTable()
  user: UserEntity;
}
