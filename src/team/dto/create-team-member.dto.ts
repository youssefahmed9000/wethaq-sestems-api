import { IsInt, IsOptional, Min } from 'class-validator';
import { ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { ParseJsonField } from 'src/common/localization/decorators/transform-localized.decorator';
import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class CreateTeamMemberDto {
  @ApiPropertyOptional({
    description: 'Localized name as a JSON string',
    example: '{"en":"Mohammed Al-Ghamdi","ar":"أ. محمد عبدالله الغامدي"}',
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  name: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized role as a JSON string',
    example: '{"en":"Managing Partner & Senior Lawyer","ar":"شريك رئيسي ومحام أول"}',
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  role: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized speciality as a JSON string',
    example: '{"en":"Commercial & Corporate","ar":"التجارة والشركات"}',
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  speciality: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized experience as a JSON string',
    example: '{"en":"18+ Yrs","ar":"18+ سنة"}',
  })
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  experience: LocalizedTextDto;


  @ApiPropertyOptional({
    description: 'Order of the team member in the list (default is 0)',
    example: '1',
  })
@IsInt()
@Min(1) // 
@IsOptional()
order?: number;
}