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
import { Tasks } from '../models/task.interface';
import { TaskEntity } from '../models/task.entity';
import { UpdateTaskForUserDto } from '../dtos/updateTaskForUser.dto';
import { AdminAuthGuard, JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  create(@Body() task: Tasks): Promise<TaskEntity[]> {
    return this.taskService.createTask(task);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<TaskEntity[]> {
    return this.taskService.deleteTask(id);
  }

  @UseGuards(AdminAuthGuard)
  @Put('admin/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updates: Tasks,
  ): Promise<TaskEntity[]> {
    return await this.taskService.updateTaskForAdmin(id, updates);
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
  ): Promise<TaskEntity[]> {
    return await this.taskService.updateTaskForUser(id, updateTaskForUserDto);
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  async findAllTasksForUser(): Promise<TaskEntity[]> {
    return await this.taskService.findAllTasksForUser();
  }

  @UseGuards(AdminAuthGuard)
  @Get('allTasks')
  async getAllTasks(): Promise<TaskEntity[]> {
    return await this.taskService.getAllTasks();
  }

  @UseGuards(AdminAuthGuard)
  @Put(':id/archiveTask')
  async archiveTask(@Param('id') id: string): Promise<any> {
    return await this.taskService.archiveTask(id);
  }
}
