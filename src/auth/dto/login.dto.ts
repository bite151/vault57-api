import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'The login must be a string' })
  @IsNotEmpty({ message: 'The login is required' })
  @MinLength(6, { message: 'The login must contain at least 6 characters' })
  login: string;

  @IsString({ message: 'The password must be a string' })
  @IsNotEmpty({ message: 'The password is required' })
  @MinLength(6, { message: 'The password must contain at least 6 characters' })
  password: string;
}
