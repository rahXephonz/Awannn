import { Injectable } from '@nestjs/common';

// data will provide in here
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
