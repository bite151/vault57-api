import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
