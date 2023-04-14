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
import { UserEntity } from 'src/user/models/user.enity';
import { Users } from 'src/user/models/user.interface';
import { AdminAuthGuard, UserAuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*
  @Get('users')
  @UseGuards(UserAuthGuard)
  getUsers() {}

  @Get('admins')
  @UseGuards(AdminAuthGuard)
  getAdmins() {}
*/

  @Get('authenticate')
  @UseGuards(AdminAuthGuard)
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

  @Post('asd')
  async getName(): Promise<Users[]> {
    return this.authService.getNamebyId();
  }
}
