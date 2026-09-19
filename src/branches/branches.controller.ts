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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all branches' })
  findAll(@Query() query: BuildQueryDto) {
    return this.branchesService.findAll(query);
  }
  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Get('admin')
  @ApiOperation({ summary: 'Get all branches for admin' })
  findAllAdmin(@Query() query: BuildQueryDto) {
    return this.branchesService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a branch by ID' })
  @ApiParam({ name: 'id', description: 'Branch ID' })
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(id);
  }



  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Post()
  @ApiOperation({ summary: 'Create a branch' })
  create(@Body() dto: CreateBranchDto) {
    return this.branchesService.create(dto);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a branch' })
  @ApiParam({ name: 'id', description: 'Branch ID' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBranchDto,
  ) {
    return this.branchesService.update(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a branch' })
  @ApiParam({ name: 'id', description: 'Branch ID' })
  remove(@Param('id') id: string) {
    return this.branchesService.remove(id);
  }
}