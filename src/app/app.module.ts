import { Module } from '@nestjs/common';
import { UserModule } from '../modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// it will define all modules and controllers
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
