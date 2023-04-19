import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { Tasks } from '../models/task.interface';
import { AdminAuthGuard, JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { TaskEntity } from '../models/task.entity';
import { UpdateTaskForUserDto } from '../dtos/updateTaskForUser.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  create(@Body() task: Tasks): Promise<TaskEntity> {
    return this.taskService.createTask(task);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('deleteAllTasks')
  deleteAllTasks(@Body() task: Tasks) {
    return this.taskService.deleteAllTasks(task);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskForUserDto: UpdateTaskForUserDto,
  ): Promise<any> {
    return await this.taskService.updateTaskForUser(id, updateTaskForUserDto);
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  findAllTasks(): Observable<Tasks[]> {
    return this.taskService.findAllTasks();
  }
}
