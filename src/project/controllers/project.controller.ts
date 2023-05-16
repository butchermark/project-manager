import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs';
import { Projects } from '../models/project.interface';
import { CreateProjectTaskDto } from '../dtos/createProjectTask.dto';
import { ProjectEntity } from '../models/project.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminAuthGuard } from '../../auth/guards/auth.guard';
import { TaskEntity } from '../../task/models/task.entity';

@UseGuards(AdminAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post(':id')
  @ApiBearerAuth()
  create(
    @Param('id') id: string,
    @Body() project: ProjectEntity,
  ): Promise<ProjectEntity> {
    return this.projectService.createProject(id, project);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Delete('deleteAllProjects')
  @ApiBearerAuth()
  deleteAllProjects(@Body() project: Projects) {
    return this.projectService.deleteAllProjects(project);
  }

  @Get(':id')
  @ApiBearerAuth()
  findProjectById(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectService.findProjectByIdForSite(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() project: Projects,
  ): Promise<ProjectEntity> {
    return this.projectService.updateProject(id, project);
  }

  @Get()
  @ApiBearerAuth()
  findAllProjects(): Observable<Projects[]> {
    return this.projectService.findAllProjects();
  }

  @Post(':id/task')
  @ApiBearerAuth()
  async createProjectTask(
    @Param('id') id: string,
    @Body() createProjectTaskDto: CreateProjectTaskDto,
  ): Promise<TaskEntity> {
    return await this.projectService.createProjectTask(
      id,
      createProjectTaskDto,
    );
  }

  @Put(':id/archiveProject')
  async archiveProject(@Param('id') id: string): Promise<ProjectEntity> {
    return await this.projectService.archiveProject(id);
  }

  @Put(':id/unarchiveProject')
  async unarchiveProject(@Param('id') id: string): Promise<ProjectEntity> {
    return await this.projectService.unarchiveProject(id);
  }
}
