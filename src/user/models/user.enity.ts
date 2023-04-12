import { ApiProperty } from '@nestjs/swagger';
import { Tasks } from 'src/task/models/task.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  @Column({ default: 'asd', name: 'name' })
  name: string;
  @Column({ default: 'asd', name: 'email' })
  email: string;
  @Column({ default: 'asd', name: 'password' })
  password: string;
  @Column({ default: true, name: 'isAdmin' })
  isAdmin: boolean;
  //@Column({ default: [], name: 'tasks' })
  //tasks: Tasks[];
  @Column({ default: 'asd', name: 'jwtToken' })
  jwtToken: string;
}
