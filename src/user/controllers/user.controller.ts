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
import { AdminAuthGuard } from 'src/auth/guards/auth.guard';
import { AddUserToTaskDto } from '../dtos/addUserToTask.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
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
}
