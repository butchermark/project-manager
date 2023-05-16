import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../models/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { Tasks } from '../models/task.interface';
import { UpdateTaskForUserDto } from '../dtos/updateTaskForUser.dto';
import { UserEntity } from '../../user/models/user.enity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createTask(task: Tasks): Promise<TaskEntity[]> {
    await this.tasksRepository.save(task);
    return this.tasksRepository.find({
      relations: ['user', 'project'],
      order: { name: 'ASC' },
    });
  }

  async deleteTask(id: string) {
    return await this.tasksRepository.delete(id);
  }

  deleteAllTasks(project: Tasks): Observable<DeleteResult> {
    return from(this.tasksRepository.delete(project));
  }

  async updateTaskForUser(
    id: string,
    updateTaskForUserDto: UpdateTaskForUserDto,
  ): Promise<TaskEntity[]> {
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
    await this.tasksRepository.save({ id: task.id, ...updateTaskProperties });
    return this.tasksRepository.find();
  }

  async updateTask(id: string, task: Tasks): Promise<TaskEntity> {
    return await this.tasksRepository.save(task);
  }

  async updateTaskForAdmin(id: string, updates: Tasks): Promise<TaskEntity> {
    const task = await this.findTaskById(id);
    return await this.tasksRepository.save({ id: task.id, ...updates });
  }

  async findAllTasksForUser(): Promise<TaskEntity[]> {
    return this.tasksRepository.find({ relations: ['user'] });
  }

  async findTaskByUserId(userId: string): Promise<TaskEntity[]> {
    return await this.tasksRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { name: 'ASC' },
    });
  }

  cannotFindTask(task: TaskEntity): void {
    if (!task) {
      throw new HttpException(
        new Error('Task not found. Cannot find task'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllTasks(): Promise<TaskEntity[]> {
    return await this.tasksRepository.find({
      relations: ['user', 'project'],
      order: { name: 'ASC' },
    });
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

  async archiveTask(id: string): Promise<any> {
    const task = await this.findTaskById(id);
    task.archived = true;
    return await this.updateTask(task.id, task);
  }

  async unarchiveTask(id: string): Promise<any> {
    const task = await this.findTaskById(id);
    task.archived = false;
    return await this.updateTask(task.id, task);
  }
}
