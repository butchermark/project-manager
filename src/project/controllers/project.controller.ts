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
import { UpdateResult } from 'typeorm';
import { Projects } from '../models/project.interface';
import { AdminAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateProjectTaskDto } from '../dtos/createProjectTask.dto';
import { ProjectEntity } from '../models/project.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TaskEntity } from 'src/task/models/task.entity';

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
  delete(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Delete('deleteAllProjects')
  @ApiBearerAuth()
  deleteAllProjects(@Body() project: Projects) {
    return this.projectService.deleteAllProjects(project);
  }

  @Put(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() project: Projects,
  ): Observable<UpdateResult> {
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
  ): Promise<TaskEntity[]> {
    console.log(createProjectTaskDto);
    return await this.projectService.createProjectTask(
      id,
      createProjectTaskDto,
    );
  }

  @Put(':id/archiveProject')
  async archiveProject(@Param('id') id: string): Promise<ProjectEntity> {
    return await this.projectService.archiveProject(id);
  }
}
