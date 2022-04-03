/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BookEntity } from '../models/book.entity';
import { Book } from '../models/book.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  createBooks(user: User, book: Book): Observable<Book> {
    book.author = user;
    return from(this.bookRepository.save(book));
  }

  getAllBooks(take: number = 10, skip: number = 0): Observable<Book[]> {
    return from(
      this.bookRepository.findAndCount({ take, skip }).then(([books]) => {
        return <Book[]>books;
      }),
    );
  }

  updateBooks(id: number, book: Book): Observable<UpdateResult> {
    return from(this.bookRepository.update(id, book));
  }

  deleteBooks(id: number): Observable<DeleteResult> {
    return from(this.bookRepository.delete(id));
  }

  findBooksById(id: number): Observable<Book> {
    const getBook = this.bookRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    return from(getBook);
  }
}
