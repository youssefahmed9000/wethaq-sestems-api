import { IsNotEmpty, IsString } from 'class-validator';

export class LocalizedTextDto {
  @IsNotEmpty()
  @IsString()
  en: string;

  @IsNotEmpty()
  @IsString()
  ar: string;
}