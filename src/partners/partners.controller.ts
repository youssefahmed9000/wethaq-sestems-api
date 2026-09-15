import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';
import { PartnerService } from './partners.service';

@ApiTags('Partners')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all partners (public, localized)' })
  findAll(@Query() query: Record<string, any>) {
    return this.partnerService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single partner (public, localized)' })
  findOne(@Param('id') id: string) {
    return this.partnerService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Get('admin')
  @ApiOperation({ summary: 'Get all partners for admin (bilingual)' })
  findAllAdmin(@Query() query: Record<string, any>) {
    return this.partnerService.findAll(query);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a partner' })
  create(
    @Body() dto: CreatePartnerDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.partnerService.create(dto, image);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update a partner' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePartnerDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.partnerService.update(id, dto, image);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a partner' })
  remove(@Param('id') id: string) {
    return this.partnerService.remove(id);
  }
}