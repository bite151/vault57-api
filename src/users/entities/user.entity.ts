import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { AccountEntity } from './account.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AuthMethod {
  CREDENTIALS = 'credentials',
  GOOGLE = 'google',
  YANDEX = 'yandex',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 25, unique: true })
  @Length(6, 25, {
    message: 'The login must be at least 6 but not longer than 25 characters',
  })
  @IsNotEmpty({ message: 'The login is required' })
  login: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  @Length(5, 50, {
    message: 'The email must be at least 5 but not longer than 50 characters',
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  @IsString({ message: 'The password must be a string' })
  @IsNotEmpty({ message: 'The password is required' })
  @MinLength(6, { message: 'The password must contain at least 6 characters' })
  password: string;

  @Column({ type: 'varchar', length: 25 })
  @Length(2, 25, {
    message: 'The name must be at least 2 but not longer than 25 characters',
  })
  @IsNotEmpty({ message: 'The name is required' })
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: AuthMethod,
    default: AuthMethod.CREDENTIALS,
  })
  authMethod: AuthMethod;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  isActive: boolean;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  isVerified: boolean;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  isTwoFactorEnabled: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;

  @OneToMany(() => AccountEntity, (account) => account.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'accountsIds' })
  accounts: AccountEntity[];
}
