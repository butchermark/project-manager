import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from 'src/task/models/task.entity';
import { UserEntity } from 'src/user/models/user.enity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
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
  @Column('varchar', { default: 'qwe', name: 'status' })
  status: string;

  @OneToOne(() => UserEntity, { nullable: true })
  @JoinTable()
  user: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];

  @ManyToMany(() => UserEntity, (user) => user.projects)
  users: UserEntity[];
}
