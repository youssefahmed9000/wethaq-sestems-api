import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParseJsonField } from 'src/common/localization/decorators/transform-localized.decorator';

import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class CreatePartnerDto {
  @ApiProperty({
    type: LocalizedTextDto,
    description: 'Localized partner name (sent as JSON string in multipart/form-data)',
    example: { en: 'Saudi Chamber', ar: 'الغرفة السعودية' },
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  name: LocalizedTextDto;
}