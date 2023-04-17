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

@UseGuards(AdminAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Post()
  create(@Body() project: Projects): Observable<Projects> {
    return this.projectService.createProject(project);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Delete('deleteAllProjects')
  deleteAllProjects(@Body() project: Projects) {
    return this.projectService.deleteAllProjects(project);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() project: Projects,
  ): Observable<UpdateResult> {
    return this.projectService.updateProject(id, project);
  }

  @Get()
  findAllProjects(): Observable<Projects[]> {
    return this.projectService.findAllProjects();
  }
}
