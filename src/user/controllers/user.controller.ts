import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Users } from '../models/user.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AddUserToTaskDto } from '../dtos/addUserToTask.dto';
import { RemoveUserFromTaskDto } from '../dtos/removeUserFromTask.dto';
import { AdminAuthGuard, JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TaskEntity } from 'src/task/models/task.entity';
import { UserEntity } from '../models/user.enity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  @ApiBearerAuth()
  async create(@Body() user: Users): Promise<UserEntity[]> {
    return await this.userService.createUser(user);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserEntity[]> {
    return await this.userService.deleteUser(id);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('deleteAllUsers')
  async deleteAllUsers(): Promise<void> {
    await this.userService.deleteAllUsers();
  }

  @UseGuards(AdminAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: Users,
  ): Promise<UserEntity[]> {
    return await this.userService.updateUser(id, user);
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  findAllUsers(): Observable<Users[]> {
    return this.userService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/tasks')
  getAllUserTasks(@Param('id') id: string): Promise<TaskEntity[]> {
    return this.userService.getAllUserTasks(id);
  }

  @UseGuards(AdminAuthGuard)
  @Post(':id/task')
  async addUserToTask(
    @Param('id') id: string,
    @Body() addUserToTaskDto: AddUserToTaskDto,
  ): Promise<any> {
    return await this.userService.addUserToTask(id, addUserToTaskDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id/task')
  async removeUserFromTask(@Param('id') id: string) {
    return await this.userService.removeUserFromTask(id);
  }
}
