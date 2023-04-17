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
import { UpdateResult } from 'typeorm';
import { AdminAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() user: Users): Observable<Users> {
    return this.userService.createUser(user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Delete('deleteAllUsers')
  deleteAllUsers(@Body() user: Users) {
    return this.userService.deleteAllUsers(user);
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
}
