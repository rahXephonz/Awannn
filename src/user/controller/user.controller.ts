import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../../auth/models/user.interface';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @ApiCreatedResponse({
    description: 'Get specific user by id',
  })
  @ApiBearerAuth('access_token')
  @Get(':userId')
  findUserById(@Param('userId') userStringId: string): Observable<User> {
    const userId = parseInt(userStringId);
    return this.userService.findUserById(userId);
  }

  @UseGuards(JwtGuard)
  @ApiCreatedResponse({
    description: 'Get your profile',
  })
  @ApiBearerAuth('access_token')
  @Get('my/profile')
  me(@Request() req): Observable<User> {
    return req.user;
  }
}
