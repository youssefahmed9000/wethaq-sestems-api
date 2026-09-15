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

import { TeamService } from './team.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a team member' })
  create(
    @Body() dto: CreateTeamMemberDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.teamService.create(dto, image);
  }


  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all team members (public, localized)' })
  findAll(@Query() query: Record<string, any>) {
    return this.teamService.findAll(query);
  }
   @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Get('admin')
  @ApiOperation({ summary: 'Get all team members for admin (bilingual)' })
  findAllAdmin(@Query() query: Record<string, any>) {
    return this.teamService.findAll(query);
  }


  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single team member (public, localized)' })
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

 

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update a team member' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTeamMemberDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.teamService.update(id, dto, image);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team member' })
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}