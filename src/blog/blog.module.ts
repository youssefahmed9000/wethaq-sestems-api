import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPost, BlogPostSchema } from './schemas/blog-post.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { StorageModule } from 'src/common/storage/storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
    ]),
    StorageModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}