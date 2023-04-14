import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {}
