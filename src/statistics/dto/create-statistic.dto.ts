import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class CreateStatisticDto {
  @ApiProperty({
    example: {
      en: 'Successful Cases',
      ar: 'حالات ناجحة',
    },
  })
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  label: LocalizedTextDto;

  @ApiProperty({
    example: '+500',
    description: 'Statistic value displayed to users.',
  })
  @IsNotEmpty()
  @IsString()
  value: string;
}