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

import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { SkipLocalize } from 'src/common/localization/decorators/skip-localize.decorator';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';
import { CurrentUserId } from 'src/common/decorators/current-user.decorator';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all blog posts (public, localized)' })
  findAll(@Query() query:BuildQueryDto) {
    return this.blogService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single blog post (public, localized)' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Get('admin')
  @ApiOperation({ summary: 'Get all blog posts for admin (bilingual)' })
  findAllAdmin(@Query() query: Record<string, any>) {
    return this.blogService.findAll(query);
  }

@Roles(UserRole.ADMIN)
@SkipLocalize()
@Post()
@UseInterceptors(FileInterceptor('image'))
@ApiConsumes('multipart/form-data')
create(
  @Body() dto: CreateBlogPostDto,
  @CurrentUserId() createdBy: string,
  @UploadedFile() image?: Express.Multer.File,
) {
  return this.blogService.create(dto, createdBy, image);
}
 @Roles(UserRole.ADMIN)
@SkipLocalize()
@Patch(':id')
@UseInterceptors(FileInterceptor('image'))
@ApiConsumes('multipart/form-data')
update(
  @Param('id') id: string,
  @Body() dto: UpdateBlogPostDto,
  @CurrentUserId() updatedBy: string,
  @UploadedFile() image?: Express.Multer.File,
) {
  return this.blogService.update(id, dto, updatedBy, image);
}

  @Roles(UserRole.ADMIN)
  @SkipLocalize()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}