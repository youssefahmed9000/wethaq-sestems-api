import { IsOptional, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SocialLinksDto {
  @ApiPropertyOptional({
    description: 'LinkedIn profile URL',
    example: 'https://www.linkedin.com/company/wathaq',
  })
  @IsOptional()
  @IsUrl({}, { message: 'linkedin must be a valid URL' })
  linkedin?: string;

  @ApiPropertyOptional({
    description: 'Instagram profile URL',
    example: 'https://www.instagram.com/wathaq',
  })
  @IsOptional()
  @IsUrl({}, { message: 'instagram must be a valid URL' })
  instagram?: string;

  @ApiPropertyOptional({
    description: 'Twitter/X profile URL',
    example: 'https://twitter.com/wathaq',
  })
  @IsOptional()
  @IsUrl({}, { message: 'twitter must be a valid URL' })
  twitter?: string;

  @ApiPropertyOptional({
    description: 'Facebook page URL',
    example: 'https://www.facebook.com/wathaq',
  })
  @IsOptional()
  @IsUrl({}, { message: 'facebook must be a valid URL' })
  facebook?: string;
}