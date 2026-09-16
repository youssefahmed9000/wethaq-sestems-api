import { Body, Controller, Get, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { MainSectionService } from './main-section.service';
import { UpdateMainSectionDto } from './dto/update-main-section.dto';

import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
// import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Main Section')
@Controller('main-section')
export class MainSectionController {
  constructor(private readonly mainSectionService: MainSectionService) {}

  @Public()
  // @SkipThrottle()
  @Get()
  @ApiOperation({
    summary: 'Get main section',
    description:
      'Returns the localized main section content for the public website.',
  })
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Response language',
    required: false,
    enum: ['ar', 'en'],
    example: 'ar',
  })
   

  findPublic() {
    return this.mainSectionService.getMainSection();
  }

  @Get('admin')
  @SkipLocalize()
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get main section for admin',
    description:
      'Returns the main section content with all supported languages for admin management.',
  })


  findForAdmin() {
    return this.mainSectionService.getMainSection();
  }

  @Patch('admin')
  @SkipLocalize()
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update main section',
    description: 'Updates the main section content. Admin access is required.',
  })
  @ApiBody({
    type: UpdateMainSectionDto,
  })



  update(@Body() dto: UpdateMainSectionDto) {
    return this.mainSectionService.updateMainSection(dto);
  }
}