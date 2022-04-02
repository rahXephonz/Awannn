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
  public async getAllBook(): Promise<Observable<Book[]>> {
    return this.bookService.getAllBooks();
  }

  @Post()
  public async createBook(@Body() book: Book): Promise<Observable<Book>> {
    return this.bookService.createBooks(book);
  }

  @Put(':id')
  public async updateBook(
    @Param('id') id: number,
    @Body() book: Book,
  ): Promise<Observable<UpdateResult>> {
    return this.bookService.updateBooks(id, book);
  }

  @Delete(':id')
  public async deleteBook(
    @Param('id') id: number,
  ): Promise<Observable<DeleteResult>> {
    return this.bookService.deleteBooks(id);
  }
}
