import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParseJsonField } from 'src/common/localization/decorators/transform-localized.decorator';
import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class CreateWhyUsDto {
  @ApiProperty({
    type: LocalizedTextDto,
    description: 'Localized title (sent as JSON string in multipart/form-data)',
    example: { en: 'Accumulated Legal Experience', ar: 'خبرة قانونية متراكمة' },
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  title: LocalizedTextDto;

  @ApiProperty({
    type: LocalizedTextDto,
    description: 'Localized description (sent as JSON string in multipart/form-data)',
    example: {
      en: 'Over 15 years of legal practice across various fields.',
      ar: 'أكثر من 15 عامًا من الممارسة القانونية في مختلف المجالات.',
    },
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  description: LocalizedTextDto;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Icon/image file for the item',
  })
  image?: any;
}