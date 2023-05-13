import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../models/project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Projects } from '../models/project.interface';
import { Observable, from } from 'rxjs';
import { CreateProjectTaskParams } from '../models/createProjectTaskParams.interface';
import { TaskService } from 'src/task/services/task.service';
import { UserService } from 'src/user/services/user.service';
import { UserEntity } from 'src/user/models/user.enity';
import { AdminAuthGuard } from 'src/auth/guards/auth.guard';
import { TaskEntity } from 'src/task/models/task.entity';

@UseGuards(AdminAuthGuard)
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  async createProject(
    id: string,
    project: ProjectEntity,
  ): Promise<ProjectEntity> {
    const manager: UserEntity = await this.userService.findUserById(id);
    project.user = manager;
    {
      project;
    }
    return await this.projectsRepository.save(project);
  }

  async deleteProject(id: string) {
    return this.projectsRepository.delete(id);
  }

  deleteAllProjects(project: Projects): Observable<DeleteResult> {
    return from(this.projectsRepository.delete(project));
  }

  async updateProject(id: string, project: Projects): Promise<ProjectEntity> {
    this.projectsRepository.update(id, project);
    return await this.findProjectById(id);
  }

  findAllProjects(): Observable<Projects[]> {
    return from(
      this.projectsRepository.find({
        order: { name: 'ASC' },
        relations: ['user', 'tasks'],
      }),
    );
  }

  async findProjectById(id: string): Promise<ProjectEntity> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['user', 'tasks'],
    });
    if (!project) {
      throw new HttpException(
        new Error('Project not found.'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return project;
  }

  async createProjectTask(
    id: string,
    createProjectTaskDetails: CreateProjectTaskParams,
  ): Promise<TaskEntity> {
    const project: ProjectEntity = await this.findProjectById(id);
    await this.taskService.createTask({
      ...createProjectTaskDetails,
      project,
    });

    return this.taskService.findTaskById(createProjectTaskDetails.id);
  }

  async archiveProject(id: string): Promise<any> {
    const project = await this.findProjectById(id);
    project.archived = true;
    return await this.updateProject(project.id, project);
  }
}
