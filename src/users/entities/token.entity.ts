import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

enum TokenType {
  VERIFICATION = 'verification',
  TWO_FACTOR = 'twoFactor',
  PASSWORD_RESET = 'passwordReset',
}

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  @Length(5, 50, {
    message: 'The email must be at least 5 but not longer than 50 characters',
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  token: string;

  @Column({
    type: 'enum',
    enum: TokenType,
  })
  tokenType: TokenType;

  @CreateDateColumn({
    type: 'timestamp',
  })
  expiresIn: Date;
}
