import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Book } from '../models/book.interface';
import { BookService } from '../service/book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getAllBook(): Observable<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Body() book: Book): Observable<Book> {
    return this.bookService.createBooks(book);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: number,
    @Body() book: Book,
  ): Observable<UpdateResult> {
    return this.bookService.updateBooks(id, book);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number): Observable<DeleteResult> {
    return this.bookService.deleteBooks(id);
  }
}
