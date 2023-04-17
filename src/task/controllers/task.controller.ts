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

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  create(@Body() task: Tasks): Observable<Tasks> {
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
  update(
    @Param('id') id: string,
    @Body() task: Tasks,
  ): Observable<UpdateResult> {
    return this.taskService.updateTask(id, task);
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  findAllTasks(): Observable<Tasks[]> {
    return this.taskService.findAllTasks();
  }
}
