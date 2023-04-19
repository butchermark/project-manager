import { Module } from '@nestjs/common';
import { TaskEntity } from './models/task.entity';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/models/user.enity';
import { ProjectEntity } from 'src/project/models/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
