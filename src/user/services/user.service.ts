import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Users } from '../models/user.interface';
import { AddUserToTaskParams } from '../models/addUserToTask.interface';
import { RemoveUserFromTaskParams } from '../models/removeUserFromTaskParams.interface';
import { TaskEntity } from 'src/task/models/task.entity';
import { TaskService } from 'src/task/services/task.service';

import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly taskService: TaskService,
  ) {}

  async createUser(user: Users): Promise<UserEntity[]> {
    const hashedPassword = await crypto
      .createHmac('sha256', process.env.USER_SALT)
      .update(user.password)
      .digest('base64');

    user.password = hashedPassword;
    await this.usersRepository.save(user);
    return await this.usersRepository.find();
  }

  async deleteUser(id: string): Promise<UserEntity[]> {
    await this.usersRepository.delete(id);
    return await this.usersRepository.find();
  }

  async deleteAllUsers(): Promise<void> {
    await this.usersRepository.clear();
  }

  async updateUser(id: string, user: Users): Promise<UserEntity[]> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.find({ order: { name: 'ASC' } });
  }

  findAllUsers(): Observable<Users[]> {
    return from(this.usersRepository.find({ order: { name: 'ASC' } }));
  }
  cannotFindUser(user: UserEntity): void {
    if (!user) {
      throw new HttpException(
        new Error('User not found. Cannot find user'),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getAllUserTasks(id: string): Promise<TaskEntity[]> {
    return await this.taskService.findTaskByUserId(id);
  }

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    this.cannotFindUser(user);
    return user;
  }

  async addUserToTask(id: string, addUserToTaskDetails: AddUserToTaskParams) {
    const task = await this.taskService.findTaskById(id);
    this.taskService.cannotFindTask(task);
    const user = await this.findUserById(addUserToTaskDetails.id);
    this.cannotFindUser(user);
    task.user = user;
    return await this.taskService.updateTask(task.id, task);
  }

  async removeUserFromTask(id: string): Promise<TaskEntity[]> {
    const task = await this.taskService.findTaskById(id);
    this.taskService.cannotFindTask(task);
    task.user = null;
    await this.taskService.updateTask(task.id, task);
    return await this.taskService.getAllTasks();
  }
}
