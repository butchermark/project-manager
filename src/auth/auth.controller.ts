import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AdminAuthGuard, JwtAuthGuard } from './guards/auth.guard';
import { Users } from '../user/models/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('authenticate')
  @UseGuards(JwtAuthGuard)
  isAuthenticated(@Req() req: Request): Promise<any> {
    const user: any = req.user;
    return user;
  }

  @Post('signin')
  async signinLocal(@Body() dto: AuthDto, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.signinLocal(dto);
    res.setHeader('Authorization', 'Bearer' + jwt.accesstoken);
    return res.json(jwt);
  }

  @UseGuards(AdminAuthGuard)
  @Post('users')
  async getUsers(): Promise<Users[]> {
    return this.authService.getUsers();
  }
}
