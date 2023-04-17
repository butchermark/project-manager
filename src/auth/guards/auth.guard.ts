import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class AdminAuthGuard extends AuthGuard('admin-jwt') {}
//EZ EGY SZAR

@Injectable()
export class UserAuthGuard extends AuthGuard('user') {}
