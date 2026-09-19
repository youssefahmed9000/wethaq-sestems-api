import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class CreateBranchDto {
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
  branchType: LocalizedTextDto;

  @ApiProperty({
    type: () => LocalizedTextDto,
  })
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  address: LocalizedTextDto;

  @ApiProperty({
    example: '+201012345678',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'branch@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: () => LocalizedTextDto,
  })
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  workingHours: LocalizedTextDto;

  @ApiProperty({
    example: 'https://maps.google.com/?q=30.0444,31.2357',
  })
  @IsString()
  @IsNotEmpty()
  mapUrl: string;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  order?: number;
}