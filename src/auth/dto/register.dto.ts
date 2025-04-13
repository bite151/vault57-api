import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordMatching } from '../../libs/decorators/is-passwords-matching.decorator';

export class RegisterDto {
  @IsString({ message: 'The login must be a string' })
  @IsNotEmpty({ message: 'The login is required' })
  @MinLength(6, { message: 'The login must contain at least 6 characters' })
  login: string;

  @IsString({ message: 'The email must be a string' })
  @IsNotEmpty({ message: 'The email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'The password must be a string' })
  @IsNotEmpty({ message: 'The password is required' })
  @MinLength(6, { message: 'The password must contain at least 6 characters' })
  password: string;

  @IsString({ message: 'The confirmation password must be a string' })
  @IsNotEmpty({ message: 'The confirmation password is required' })
  @MinLength(6, {
    message: 'The confirmation password must contain at least 6 characters',
  })
  @Validate(IsPasswordMatching, { message: 'Passwords must match' })
  passwordConfirm: string;
}
