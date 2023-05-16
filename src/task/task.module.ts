import { Module } from '@nestjs/common';
import { TaskEntity } from './models/task.entity';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/models/user.enity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
