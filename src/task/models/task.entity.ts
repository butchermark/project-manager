import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from '../../project/models/project.entity';
import { UserEntity } from '../../user/models/user.enity';

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

  @ManyToOne(() => ProjectEntity, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinTable()
  user: UserEntity;
}
