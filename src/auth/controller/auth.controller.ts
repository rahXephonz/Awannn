import { Body, Controller, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: User): Observable<User> {
    return this.authService.signUpAccount(user);
  }

  @Post('signin')
  signin(@Body() user: User): Observable<{ access_token: string }> {
    return this.authService.signInAccount(user).pipe(
      map((jwt: string) => ({
        access_token: jwt,
      })),
    );
  }
}
