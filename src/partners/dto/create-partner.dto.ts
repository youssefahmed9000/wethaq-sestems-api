import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { ParseJsonField } from 'src/common/localization/decorators/transform-localized.decorator';

import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';


export class CreatePartnerDto {
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  name: LocalizedTextDto;

}
