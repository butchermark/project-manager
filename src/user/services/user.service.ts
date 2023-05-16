import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Users } from '../models/user.interface';
import { AddUserToTaskParams } from '../models/addUserToTask.interface';
import * as crypto from 'crypto';
import { TaskEntity } from '../../task/models/task.entity';
import { TaskService } from '../../task/services/task.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly taskService: TaskService,
  ) {}

  async createUser(user: Users): Promise<UserEntity> {
    const hashedPassword = await crypto
      .createHmac('sha256', process.env.USER_SALT)
      .update(user.password)
      .digest('base64');

    user.password = hashedPassword;
    return await this.usersRepository.save(user);
  }

  async deleteUser(id: string): Promise<UserEntity[]> {
    await this.usersRepository.delete(id);
    return await this.usersRepository.find({ order: { name: 'ASC' } });
  }

  async deleteAllUsers(): Promise<void> {
    await this.usersRepository.clear();
  }

  async updateUser(id: string, user: Users): Promise<UserEntity> {
    this.usersRepository.update(id, user);
    return await this.findUserById(id);
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

  async getAllAdmins(): Promise<UserEntity[]> {
    return await this.usersRepository.find({ where: { isAdmin: true } });
  }

  async getAllUserTasks(id: string): Promise<TaskEntity[]> {
    return await this.taskService.findTaskByUserId(id);
  }

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    this.cannotFindUser(user);
    return user;
  }

  async userRegistration(user: Users): Promise<UserEntity> {
    return await this.createUser(user);
  }

  async addUserToTask(
    id: string,
    addUserToTaskDetails: AddUserToTaskParams,
  ): Promise<TaskEntity> {
    const task = await this.taskService.findTaskById(id);
    this.taskService.cannotFindTask(task);
    const user = await this.findUserById(addUserToTaskDetails.id);
    this.cannotFindUser(user);
    task.user = user;
    return await this.taskService.updateTask(task.id, task);
  }

  async removeUserFromTask(id: string) {
    const task = await this.taskService.findTaskById(id);
    this.taskService.cannotFindTask(task);
    task.user = null;
    return await this.taskService.updateTask(task.id, task);
  }
}
