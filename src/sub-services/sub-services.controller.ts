import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { SubServicesService } from './sub-services.service';
import { CreateSubServiceDto } from './dto/create-sub-service.dto';
import { UpdateSubServiceDto } from './dto/update-sub-service.dto';

import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';
import { UserRole } from 'src/users/enums/roles.enum';

@ApiTags('Sub Services')
@Controller()
export class SubServicesController {
  constructor(private readonly subServicesService: SubServicesService) {}

  @Public()
  @Get('services/:serviceId/sub-services')
  @ApiOperation({ summary: 'Get all sub-services for a service' })
  @ApiParam({ name: 'serviceId', description: 'Service ID' })
  findAllByService(@Param('serviceId') serviceId: string) {
    return this.subServicesService.findAllByService(serviceId);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Get('services/:serviceId/sub-services/admin')
  @ApiOperation({ summary: 'Get all sub-services for admin' })
  @ApiParam({ name: 'serviceId', description: 'Service ID' })
  findAllByServiceAdmin(@Param('serviceId') serviceId: string) {
    return this.subServicesService.findAllByService(serviceId);
  }

  @Public()
  @Get('sub-services/:id')
  @ApiOperation({ summary: 'Get a sub-service by ID' })
  @ApiParam({ name: 'id', description: 'Sub-service ID' })
  findOne(@Param('id') id: string) {
    return this.subServicesService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Post('sub-services')
  @ApiOperation({ summary: 'Create a sub-service' })
  create(@Body() dto: CreateSubServiceDto) {
    return this.subServicesService.create(dto);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Patch('sub-services/:id')
  @ApiOperation({ summary: 'Update a sub-service' })
  @ApiParam({ name: 'id', description: 'Sub-service ID' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSubServiceDto,
  ) {
    return this.subServicesService.update(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Delete('sub-services/:id')
  @ApiOperation({ summary: 'Delete a sub-service' })
  @ApiParam({ name: 'id', description: 'Sub-service ID' })
  remove(@Param('id') id: string) {
    return this.subServicesService.remove(id);
  }
}