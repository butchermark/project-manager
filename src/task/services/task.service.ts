import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../models/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { Tasks } from '../models/task.interface';
import { UpdateTaskForUserDto } from '../dtos/updateTaskForUser.dto';
import { UserService } from 'src/user/services/user.service';
import { UserEntity } from 'src/user/models/user.enity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  createTask(task: Tasks): Promise<TaskEntity> {
    return this.tasksRepository.save(task);
  }

  deleteTask(id: string): Observable<DeleteResult> {
    return from(this.tasksRepository.delete(id));
  }

  deleteAllTasks(project: Tasks): Observable<DeleteResult> {
    return from(this.tasksRepository.delete(project));
  }

  async updateTaskForUser(
    id: string,
    updateTaskForUserDto: UpdateTaskForUserDto,
  ): Promise<any> {
    const task = await this.findTaskById(id);
    const user = await this.usersRepository.findOne({
      where: { id: updateTaskForUserDto.userId },
    });

    const { userId, ...updateTaskProperties } = updateTaskForUserDto;

    if (user.id !== task.user.id) {
      throw new HttpException(
        new Error('User is not part of the task'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tasksRepository.update(id, updateTaskProperties);
  }

  updateTask(id: string, task: Tasks): Observable<UpdateResult> {
    return from(this.tasksRepository.update(id, task));
  }

  findAllTasks(): Observable<Tasks[]> {
    return from(this.tasksRepository.find());
  }
  findTaskById(id: string): Promise<TaskEntity> {
    const task = this.tasksRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (!task) {
      throw new HttpException(
        new Error('Task not found. Cannot find task'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return task;
  }
}
