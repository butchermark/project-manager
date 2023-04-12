import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../models/project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Projects } from '../models/project.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
  ) {}

  createProject(project: Projects): Observable<Projects> {
    return from(this.projectsRepository.save(project));
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
    return from(this.projectsRepository.find());
  }
}
