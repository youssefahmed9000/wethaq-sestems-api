import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all services (public, localized)' })
  findAll(@Query() query: BuildQueryDto) {
    return this.servicesService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single service (public, localized)' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Get('admin')
  @ApiOperation({ summary: 'Get all services for admin (bilingual)' })
  findAllAdmin(@Query() query: BuildQueryDto) {
    return this.servicesService.findAll(query);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a service' })

  create(
    @Body() dto: CreateServiceDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.servicesService.create(dto, image);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update a service' })

  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.servicesService.update(id, dto, image);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service' })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}