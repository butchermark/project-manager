import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Users } from '../models/user.interface';
import { AddUserToTaskParams } from '../models/addUserToTask.interface';
import { TaskService } from 'src/task/services/task.service';
import { RemoveUserFromTaskParams } from '../models/removeUserFromTaskParams.interface';
import { TaskEntity } from 'src/task/models/task.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly taskService: TaskService,
  ) {}

  createUser(user: Users): Observable<Users> {
    return from(this.usersRepository.save(user));
  }

  deleteUser(id: string): Observable<DeleteResult> {
    return from(this.usersRepository.delete(id));
  }

  async deleteAllUsers(): Promise<void> {
    await this.usersRepository.clear();
  }

  updateUser(id: string, user: Users): Observable<UpdateResult> {
    return from(this.usersRepository.update(id, user));
  }

  findAllUsers(): Observable<Users[]> {
    return from(this.usersRepository.find());
  }
  cannotFindUser(user: UserEntity): void {
    if (!user) {
      throw new HttpException(
        new Error('User not found. Cannot find user'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  cannotFindTask(task: TaskEntity): void {
    if (!task) {
      throw new HttpException(
        new Error('Task not found. Cannot find task'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    this.cannotFindUser(user);
    return user;
  }

  async addUserToTask(id: string, addUserToTaskDetails: AddUserToTaskParams) {
    const task = await this.taskService.findTaskById(id);
    this.cannotFindTask(task);
    const user = await this.findUserById(addUserToTaskDetails.id);
    this.cannotFindUser(user);
    console.log(task);
    task.user = user;
    console.log(task);
    return await this.taskService.updateTask(task.id, task);
  }

  async removeUserFromTask(
    id: string,
    removeUserFromTaskDetails: RemoveUserFromTaskParams,
  ) {
    const task = await this.taskService.findTaskById(id);
    this.cannotFindTask(task);
    const user = await this.findUserById(removeUserFromTaskDetails.id);
    this.cannotFindUser(user);
    console.log(task);
    task.user = null;
    console.log(task);
    return await this.taskService.updateTask(task.id, task);
  }
}
