import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '../../auth/models/user.interface';
import { AuthService } from '../../auth/service/auth.service';
import { Book } from '../models/book.interface';
import { BookService } from '../service/book.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private bookService: BookService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { user, params }: { user: User; params: { id: number } } = request;

    if (!user || !params) return false;

    if (user.role === 'admin') return true; // allows admin to get or make request

    const userId = user.id;
    const postId = params.id;

    return this.authService.findUserById(userId).pipe(
      switchMap((user: User) =>
        this.bookService.findBooksById(postId).pipe(
          map((book: Book) => {
            const isAuthor = user.id === book.author.id;
            return isAuthor;
          }),
        ),
      ),
    );
  }
}
