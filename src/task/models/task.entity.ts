import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from 'src/project/models/project.entity';
import { Projects } from 'src/project/models/project.interface';
import { UserEntity } from 'src/user/models/user.enity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  project: Projects;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
