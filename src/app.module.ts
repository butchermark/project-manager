import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { UserEntity } from './user/models/user.enity';
import { ProjectEntity } from './project/models/project.entity';
import { TaskEntity } from './task/models/task.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, ProjectEntity, TaskEntity],
      synchronize: true,
    }),
    UserModule,
    ProjectModule,
    TaskModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
