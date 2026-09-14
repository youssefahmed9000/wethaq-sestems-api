import {
  Body,
  Controller,
  Get,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AboutUsService } from './about-us.service';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';

@ApiTags('About Us')
@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get About Us content',
    description: 'Returns the public About Us content.',
  })
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Response language',
    required: false,
    enum: ['ar', 'en'],
    example: 'ar',
  })
  findOne() {
    return this.aboutUsService.getAboutUs();
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Get('admin')
  @ApiOperation({
    summary: 'Get About Us content for admin',
    description: 'Returns the About Us content for administrative use.',
  })
  findOneAdmin() {
    return this.aboutUsService.getAboutUs();
  }

  @Put()
  @SkipLocalize()
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Update About Us content',
    description:
      'Updates the About Us content. An optional image can be uploaded with the request.',
  })
  @ApiConsumes('multipart/form-data')
  update(
    @Body() dto: UpdateAboutUsDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.aboutUsService.updateAboutUs(dto, image);
  }
}
