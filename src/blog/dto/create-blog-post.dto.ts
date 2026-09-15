import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { ParseJsonField } from 'src/common/localization/decorators/transform-localized.decorator';
import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class CreateBlogPostDto {
  @ApiPropertyOptional({
    description: 'Localized category as a JSON string',
    example: '{"en":"Companies Law","ar":"نظام الشركات"}',
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  category: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized title as a JSON string',
    example:
      '{"en":"Key Amendments to Saudi Companies Law 2024","ar":"أبرز التعديلات على نظام الشركات السعودي لعام 2024"}',
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  title: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized date as a JSON string',
    example: '{"en":"15 Aug 2024","ar":"2024 أغسطس 15"}',
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  date: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized read time as a JSON string',
    example: '{"en":"8 min","ar":"8 دقائق"}',
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  readTime: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized article body as a JSON string',
    example: '{"en":"...","ar":"..."}',
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  articleBody: LocalizedTextDto;

  @IsNotEmpty()
  @IsString()
  slug: string;
}