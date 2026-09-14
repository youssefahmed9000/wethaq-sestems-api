
import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SettingsService } from './settings.service';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { UpdateSettingsDto } from './dto/update-setting.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get public settings' })
  @ApiResponse({ status: 200, description: 'Returns public settings' })
  
  findPublic() {
    return this.settingsService.getSettings();
  }

  @Get('admin')
  @SkipLocalize()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get settings for admin dashboard' })
  @ApiResponse({ status: 200, description: 'Returns all settings' })
  @ApiHeader({
  name: 'Accept-Language',
  description: 'Response language',
  required: false,
  enum: ['ar', 'en'],
  example: 'ar',
})
  findForAdmin() {
    return this.settingsService.getSettings();
  }

  @Patch()
  @SkipLocalize()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update settings' })
  @ApiResponse({ status: 200, description: 'Settings updated successfully' })
  update(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(dto);
  }
}