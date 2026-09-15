import { PartialType } from '@nestjs/swagger';
import { CreateWhyUsDto } from './create-why-us.dto';

export class UpdateWhyUsDto extends PartialType(CreateWhyUsDto) {}
