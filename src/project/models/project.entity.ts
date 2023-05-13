import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from 'src/task/models/task.entity';
import { UserEntity } from 'src/user/models/user.enity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('projects')
export class ProjectEntity {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  @Column('varchar', { default: 'qwe', name: 'name' })
  name: string;
  @Column('varchar', { default: 'qwe', name: 'description' })
  description: string;
  @Column('varchar', { default: 'qwe', name: 'status' })
  status: string;
  @Column('boolean', { default: false, name: 'isArchived' })
  archived: boolean;

  @ManyToOne(() => UserEntity, (user) => user.project, { onDelete: 'CASCADE' })
  @JoinTable()
  user: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.project, { cascade: true })
  tasks: TaskEntity[];

  @ManyToMany(() => UserEntity, (users) => users.projects)
  users: UserEntity[];
}
