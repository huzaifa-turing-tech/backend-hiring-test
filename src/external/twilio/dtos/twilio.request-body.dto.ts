import { IsNotEmpty, IsString } from 'class-validator';

export class InputDto {
  @IsString()
  @IsNotEmpty()
  Digits: string;
}
