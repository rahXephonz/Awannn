import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BookEntity } from '../models/book.entity';
import { Book } from '../models/book.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  getAllBooks(): Observable<Book[]> {
    return from(this.bookRepository.find());
  }

  createBooks(book: Book): Observable<Book> {
    return from(this.bookRepository.save(book));
  }

  updateBooks(id: number, book: Book): Observable<UpdateResult> {
    return from(this.bookRepository.update(id, book));
  }

  deleteBooks(id: number): Observable<DeleteResult> {
    return from(this.bookRepository.delete(id));
  }
}
