import { IsOptional, IsUrl } from 'class-validator';

export class SocialLinksDto {
  @IsOptional()
  @IsUrl({}, { message: 'linkedin must be a valid URL' })
  linkedin?: string;

  @IsOptional()
  @IsUrl({}, { message: 'instagram must be a valid URL' })
  instagram?: string;

  @IsOptional()
  @IsUrl({}, { message: 'twitter must be a valid URL' })
  twitter?: string;

  @IsOptional()
  @IsUrl({}, { message: 'facebook must be a valid URL' })
  facebook?: string;
}