import { ApiProperty } from '@nestjs/swagger';

export class LocalizedTextDto {
  @ApiProperty({ example: 'اسم المكتب' })
  ar: string;

  @ApiProperty({ example: 'Office Name' })
  en: string;
}