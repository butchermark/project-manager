import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { Tasks } from '../models/task.interface';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  create(@Body() task: Tasks): Observable<Tasks> {
    return this.taskService.createTask(task);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Delete('deleteAllTasks')
  deleteAllTasks(@Body() task: Tasks) {
    return this.taskService.deleteAllTasks(task);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() task: Tasks,
  ): Observable<UpdateResult> {
    return this.taskService.updateTask(id, task);
  }

  @Get()
  findAllTasks(): Observable<Tasks[]> {
    return this.taskService.findAllTasks();
  }
}
