import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BookEntity } from '../models/book.entity';
import { Book } from '../models/book.interface';
import { BookService } from '../service/book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Getting all of books',
  })
  public async getAllBook(): Promise<Observable<Book[]>> {
    const books = await this.bookService.getAllBooks();
    return books;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Creating a book',
  })
  @ApiBody({ type: BookEntity })
  public async createBook(@Body() book: Book): Promise<Observable<Book>> {
    const creatingBook = await this.bookService.createBooks(book);
    return creatingBook;
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updating a book',
  })
  public async updateBook(
    @Param('id') id: number,
    @Body() book: Book,
  ): Promise<Observable<UpdateResult>> {
    const updatingBook = await this.bookService.updateBooks(id, book);
    return updatingBook;
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleting a book',
  })
  public async deleteBook(
    @Param('id') id: number,
  ): Promise<Observable<DeleteResult>> {
    const deletingBook = await this.bookService.deleteBooks(id);
    return deletingBook;
  }
}
