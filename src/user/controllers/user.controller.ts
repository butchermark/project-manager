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
import { UserService } from '../services/user.service';
import { Users } from '../models/user.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AddUserToTaskDto } from '../dtos/addUserToTask.dto';
import { RemoveUserFromTaskDto } from '../dtos/removeUserFromTask.dto';
import { AdminAuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AdminAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: Users): Observable<Users> {
    return this.userService.createUser(user);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }

  @Delete('deleteAllUsers')
  async deleteAllUsers(): Promise<void> {
    await this.userService.deleteAllUsers();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: Users,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Get()
  findAllUsers(): Observable<Users[]> {
    return this.userService.findAllUsers();
  }

  @Post(':id/task')
  async addUserToTask(
    @Param('id') id: string,
    @Body() addUserToTaskDto: AddUserToTaskDto,
  ): Promise<any> {
    return await this.userService.addUserToTask(id, addUserToTaskDto);
  }

  @Delete(':id/task')
  async removeUserFromTask(
    @Param('id') id: string,
    @Body() removeUserFromTaskDto: RemoveUserFromTaskDto,
  ): Promise<any> {
    return await this.userService.removeUserFromTask(id, removeUserFromTaskDto);
  }
}
