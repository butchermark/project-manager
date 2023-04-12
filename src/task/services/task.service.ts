import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../models/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { Tasks } from '../models/task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {}

  createTask(task: Tasks): Observable<Tasks> {
    return from(this.tasksRepository.save(task));
  }

  deleteTask(id: string): Observable<DeleteResult> {
    return from(this.tasksRepository.delete(id));
  }

  deleteAllTasks(project: Tasks): Observable<DeleteResult> {
    return from(this.tasksRepository.delete(project));
  }

  updateTask(id: string, project: Tasks): Observable<UpdateResult> {
    return from(this.tasksRepository.update(id, project));
  }

  findAllTasks(): Observable<Tasks[]> {
    return from(this.tasksRepository.find());
  }
}
