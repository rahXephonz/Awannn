import { Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { BookController } from './controllers/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './models/book.entity';
import { AuthModule } from '../auth/auth.module';
import { IsCreatorGuard } from './guards/is-creator.guard';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([BookEntity])],
  providers: [BookService, IsCreatorGuard],
  controllers: [BookController],
})
export class BookModule {}
