import { Type } from 'class-transformer';
import { IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LogsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number | undefined;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number | undefined;

  @IsString()
  @IsOptional()
  from: string | undefined;
}
