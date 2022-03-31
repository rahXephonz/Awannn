import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // get Hello
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
