import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Users } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  createUser(user: Users): Observable<Users> {
    return from(this.usersRepository.save(user));
  }

  deleteUser(id: string): Observable<DeleteResult> {
    return from(this.usersRepository.delete(id));
  }

  deleteAllUsers(user: Users): Observable<DeleteResult> {
    return from(this.usersRepository.delete(user));
  }

  updateUser(id: string, user: Users): Observable<UpdateResult> {
    return from(this.usersRepository.update(id, user));
  }

  findAllUsers(): Observable<Users[]> {
    return from(this.usersRepository.find());
  }
}
