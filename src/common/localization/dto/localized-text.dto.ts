import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LocalizedTextDto {
  @ApiProperty({ example: 'اسم المكتب' })
  @IsString()
  ar: string;

  @ApiProperty({ example: 'Office Name' })
  @IsString()
  
  en: string;
}