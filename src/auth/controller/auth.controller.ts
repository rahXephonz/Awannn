import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { SigninEntity, UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Signing up a user account to access all of the features',
  })
  @ApiBody({ type: UserEntity })
  signup(@Body() user: User): Observable<User> {
    return this.authService.signUpAccount(user);
  }

  @Post('signin')
  @ApiCreatedResponse({
    description: 'Login to get access token and pass it into authorize button',
  })
  @ApiBody({ type: SigninEntity })
  signin(@Body() user: User): Observable<{ access_token: string }> {
    return this.authService.signInAccount(user).pipe(
      map((jwt: string) => ({
        access_token: jwt,
      })),
    );
  }
}
