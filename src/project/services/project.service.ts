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
import { AdminAuthGuard } from '../../auth/guards/auth.guard';
import { TaskEntity } from '../../task/models/task.entity';
import { TaskService } from '../../task/services/task.service';
import { UserEntity } from '../../user/models/user.enity';
import { UserService } from '../../user/services/user.service';

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
      relations: ['user'],
    });
    if (!project) {
      throw new HttpException(
        new Error('Project not found.'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return project;
  }

  async findProjectByIdForSite(id: string): Promise<ProjectEntity> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['user', 'users', 'tasks'],
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

  async unarchiveProject(id: string): Promise<any> {
    const project = await this.findProjectById(id);
    project.archived = false;
    return await this.updateProject(project.id, project);
  }
}
