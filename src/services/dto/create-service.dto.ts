import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ParseJsonField } from 'src/common/localization/decorators/transform-localized.decorator';
import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Localized service name',
    example: {
      en: 'Nutrition Consultation',
      ar: 'استشارة تغذية',
    },
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  name: LocalizedTextDto;

  @ApiProperty({
    description: 'Localized service description',
    example: {
      en: 'Professional nutrition consultation service',
      ar: 'خدمة استشارة تغذية احترافية',
    },
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  description: LocalizedTextDto;

  @ApiProperty({
    description: 'Unique URL-friendly identifier for the service',
    example: 'nutrition-consultation',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;
}