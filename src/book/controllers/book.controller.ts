/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BookEntity } from '../models/book.entity';
import { Book } from '../models/book.interface';
import { BookService } from '../service/book.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { IsCreatorGuard } from '../guards/is-creator.guard';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiCreatedResponse({
    description: 'Getting all of books use take and skip to get paginate',
  })
  @ApiBearerAuth('access_token')
  getPaginateBooks(
    @Query('take') take: number = 1,
    @Query('skip') skip: number = 1,
  ): Observable<Book[]> {
    take = take > 20 ? 20 : take;

    const paginateBooks = this.bookService.getAllBooks(take, skip);
    return paginateBooks;
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiCreatedResponse({
    description: 'Creating a book',
  })
  @ApiBody({ type: BookEntity })
  @ApiBearerAuth('access_token')
  createBook(@Body() book: Book, @Request() req): Observable<Book> {
    console.log(req.user);

    const creatingBook = this.bookService.createBooks(req.user, book);
    return creatingBook;
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard, IsCreatorGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiCreatedResponse({
    description: 'Updating a book',
  })
  @ApiBearerAuth('access_token')
  updateBook(
    @Param('id') id: number,
    @Body() book: Book,
  ): Observable<UpdateResult> {
    const updatingBook = this.bookService.updateBooks(id, book);
    return updatingBook;
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard, IsCreatorGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiCreatedResponse({
    description: 'Deleting a book',
  })
  @ApiBearerAuth('access_token')
  deleteBook(@Param('id') id: number): Observable<DeleteResult> {
    const deletingBook = this.bookService.deleteBooks(id);
    return deletingBook;
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access_token')
  findBooksById(@Param('id') id: number): Observable<Book> {
    const findBookById = this.bookService.findBooksById(id);

    return findBookById;
  }
}
