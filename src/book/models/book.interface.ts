import { User } from '../../auth/models/user.interface';

export interface Book {
  id?: number;
  title?: string;
  createdAt?: Date;
  author?: User;
}
