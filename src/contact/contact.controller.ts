import { Controller, Get, Patch, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';
import { UpdateContactSectionDto } from './dto/update-contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get contact section (public, localized)' })
  find() {
    return this.contactService.find();
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Get('admin')
  @ApiOperation({ summary: 'Get contact section for admin (bilingual)' })
  findAdmin() {
    return this.contactService.find();
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Patch()
  @ApiOperation({ summary: 'Update contact section (upsert)' })
  update(@Body() dto: UpdateContactSectionDto) {
    return this.contactService.update(dto);
  }
}