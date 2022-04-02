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

  public async getAllBooks(): Promise<Observable<Book[]>> {
    return from(this.bookRepository.find());
  }

  public async createBooks(book: Book): Promise<Observable<Book>> {
    return from(this.bookRepository.save(book));
  }

  public async updateBooks(
    id: number,
    book: Book,
  ): Promise<Observable<UpdateResult>> {
    return from(this.bookRepository.update(id, book));
  }

  public async deleteBooks(id: number): Promise<Observable<DeleteResult>> {
    return from(this.bookRepository.delete(id));
  }
}
