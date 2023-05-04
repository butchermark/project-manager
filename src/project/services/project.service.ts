import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../models/project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Projects } from '../models/project.interface';
import { Observable, from } from 'rxjs';
import { CreateProjectTaskParams } from '../models/createProjectTaskParams.interface';
import { TaskService } from 'src/task/services/task.service';
import { UserService } from 'src/user/services/user.service';
import { UserEntity } from 'src/user/models/user.enity';

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
    if (manager.isAdmin === false) {
      throw new HttpException(
        new Error('Only admin can create project'),
        HttpStatus.BAD_REQUEST,
      );
    }
    project.user = manager;
    {
      project;
    }
    return await this.projectsRepository.save(project);
  }

  deleteProject(id: string): Observable<DeleteResult> {
    return from(this.projectsRepository.delete(id));
  }

  deleteAllProjects(project: Projects): Observable<DeleteResult> {
    return from(this.projectsRepository.delete(project));
  }

  updateProject(id: string, project: Projects): Observable<UpdateResult> {
    return from(this.projectsRepository.update(id, project));
  }

  findAllProjects(): Observable<Projects[]> {
    return from(this.projectsRepository.find({ relations: ['user', 'tasks'] }));
  }

  async findProjectById(id: string): Promise<ProjectEntity> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) {
      throw new HttpException(
        new Error('Project not found. Cannot create task'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return project;
  }

  async createProjectTask(
    id: string,
    createProjectTaskDetails: CreateProjectTaskParams,
  ) {
    const project: ProjectEntity = await this.findProjectById(id);
    await this.taskService.createTask({
      ...createProjectTaskDetails,
      project,
    });

    return await this.projectsRepository.save(project);
  }

  async archiveProject(id: string): Promise<any> {
    const project = await this.findProjectById(id);
    project.archived = true;
    return await this.updateProject(project.id, project);
  }
}
