// src/modules/why-us/why-us.controller.ts
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

import { WhyUsService } from './why-us.service';
import { CreateWhyUsDto } from './dto/create-why-us.dto';
import { UpdateWhyUsDto } from './dto/update-why-us.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';

@ApiTags('Why Us')
@Controller('why-us')
export class WhyUsController {
  constructor(private readonly whyUsService: WhyUsService) {}
 @Public()
  @Get()
  @ApiOperation({ summary: 'Get all why-us items (public, localized)' })
  findAll(@Query() query: Record<string, any>) {
    return this.whyUsService.findAll(query);
  }
  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Get('admin')
  @ApiOperation({ summary: 'Get all why-us items for admin (bilingual)' })
  findAllAdmin(@Query() query: Record<string, any>) {
    return this.whyUsService.findAll(query);
  }

 

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single why-us item (public, localized)' })
  findOne(@Param('id') id: string) {
    return this.whyUsService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a why-us item' })
  create(
    @Body() dto: CreateWhyUsDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.whyUsService.create(dto, image);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update a why-us item' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWhyUsDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.whyUsService.update(id, dto, image);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a why-us item' })
  remove(@Param('id') id: string) {
    return this.whyUsService.remove(id);
  }
}