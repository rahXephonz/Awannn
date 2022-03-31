import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

// data will provide in here
@Injectable()
export class UserService {
  public users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUser(email: string): User {
    const fillUser = this.users.filter((user) => user.email === email)[0];
    if (fillUser && Array.isArray(fillUser) && fillUser.length > 0) {
      return fillUser[0];
    }

    throw new NotFoundException(`User with email ${email} not found`);
  }

  addUser(user: User): User {
    this.users.push(user);
    return user;
  }

  deleteUser(email: string): User[] {
    const remainingUser = this.users.filter((user) => user.email !== email);
    // override users
    this.users = remainingUser;
    return remainingUser || [];
  }
}
