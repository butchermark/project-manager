import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './models/project.entity';
import { ProjectController } from './controllers/project.controller';
import { TaskModule } from '../task/task.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), TaskModule, UserModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
