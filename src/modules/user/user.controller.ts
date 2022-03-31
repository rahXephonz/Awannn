import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './interface/user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // get All User HTTP GET /user
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }
  // get Specific User HTTP GET /user/:email
  @Get('/:email')
  getUser(@Param('email') email: string): User {
    return this.userService.getUser(email);
  }
  // create User HTTP POST /user
  @Post()
  postUser(@Body() user: User): User {
    return this.userService.addUser(user);
  }
  // delete User HTTP DELETE /user/:email
  @Delete(':email')
  deleteUser(@Param('email') email: string): User[] {
    return this.userService.deleteUser(email);
  }
}
