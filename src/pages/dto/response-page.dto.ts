import { CreatePageDto } from './create-page.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class ResponsePageDto extends CreatePageDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
