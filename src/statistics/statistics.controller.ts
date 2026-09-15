import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  
  @Post('create')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create a new statistic',
  })
  @ApiResponse({
    status: 201,
    description: 'Statistic created successfully.',
  })
  create(@Body() dto: CreateStatisticDto) {
    return this.statisticsService.create(dto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get all statistics',
  })
  @ApiHeader({
  name: 'Accept-Language',
  description: 'Response language',
  required: false,
  enum: ['ar', 'en'],
  example: 'ar',
})

  findAll(@Query() query:BuildQueryDto) {
    return this.statisticsService.findAll(query);
  }

  @Get(':id')
  
  @ApiOperation({
    summary: 'Get statistic by ID',
  })
 
  findOne(@Param('id') id: string) {
    return this.statisticsService.findOne(id);
  }


  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update a statistic',
  })

  update(
    @Param('id') id: string,
    @Body() dto: UpdateStatisticDto,
  ) {
    return this.statisticsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete a statistic',
  })

  remove(@Param('id') id: string) {
    return this.statisticsService.remove(id);
  }
}