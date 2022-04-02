import { Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { BookController } from './controllers/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './models/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
