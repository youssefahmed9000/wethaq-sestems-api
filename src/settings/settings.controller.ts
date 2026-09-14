import { Body, Controller, Get, Patch, Put, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { UpdateSettingsDto } from './dto/update-setting.dto';
import { Public } from 'src/common/decorators/public.decorator';


@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}
@Public()
  @Get()
  findPublic() {
    return this.settingsService.getSettings();
  }

  // Dashboard endpoint — بيرجع en و ar مع بعض
  @Get('admin')
  @SkipLocalize()

  @Roles(UserRole.ADMIN)
  findForAdmin() {
    return this.settingsService.getSettings();
  }

  @Patch()
  @SkipLocalize()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(dto);
  }
}