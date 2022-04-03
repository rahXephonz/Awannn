import { BookEntity } from '../../book/models/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ type: String, description: 'firstName' })
  firstName: string;

  @Column()
  @ApiProperty({ type: String, description: 'lastName' })
  lastName: string;

  @Column({ unique: true })
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @Column({ select: false })
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => BookEntity, (bookEntity) => bookEntity.author)
  books: BookEntity[];
}

export class SigninEntity {
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
