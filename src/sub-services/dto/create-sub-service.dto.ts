import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class CreateSubServiceDto {
  @ApiProperty({
    type: () => LocalizedTextDto,
  })
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  name: LocalizedTextDto;

  @ApiProperty({
    type: () => LocalizedTextDto,
  })
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  description: LocalizedTextDto;

  @ApiProperty({
    example: '66c8f5e8a123456789abcdef',
  })
  @IsMongoId()
  @IsNotEmpty()
  service: string;
}