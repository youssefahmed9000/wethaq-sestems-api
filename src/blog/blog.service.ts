import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost, BlogPostDocument } from './schemas/blog-post.schema';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { UploadService } from 'src/common/storage/upload.service';
import { ApiFeatures } from 'src/common/utils/api-features'; // ⚠️ confirm actual path
import { BuildQueryDto } from 'src/common/dto/base-query.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name)
    private readonly blogPostModel: Model<BlogPostDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async findAll(query:BuildQueryDto) {
  

    const baseQuery = this.blogPostModel.find().lean().populate('createdBy', ' fullName');

    const features = new ApiFeatures<BlogPost>(baseQuery, query)
      .filter()
      .search(['title.en', 'title.ar', 'category.en', 'category.ar'])
      .sort()
      .limitFields();

    const total = await features.count();
    features.paginate(total);

    const data = await features.exec();

    return {
      pagination: features.paginationResult ,
       data,
       };
  }

  async findOne(id: string) {
    const post = await this.blogPostModel.findById(id).lean().populate('createdBy', 'fullName')
    .populate('updatedBy', 'fullName');

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return post;
  }

  async create(dto: CreateBlogPostDto,createdBy: string, file?: Express.Multer.File,) {
    const existing = await this.blogPostModel
      .findOne({ slug: dto.slug })
      .lean();

    if (existing) {
      throw new ConflictException(
        `Blog post with slug "${dto.slug}" already exists`,
      );
    }

    let image: string | undefined;

    if (file) {
      image = await this.uploadService.uploadSingle(file);
    }

    return this.blogPostModel.create({ ...dto, image, createdBy: createdBy });
  }

  async update(id: string, dto: UpdateBlogPostDto, updatedBy: string, file?: Express.Multer.File) {
    const existing = await this.blogPostModel.findById(id);

    if (!existing) {
      throw new NotFoundException('Blog post not found');
    }

    if (dto.slug && dto.slug !== existing.slug) {
      const slugTaken = await this.blogPostModel
        .findOne({ slug: dto.slug, _id: { $ne: id } })
        .lean();

      if (slugTaken) {
        throw new ConflictException(
          `Blog post with slug "${dto.slug}" already exists`,
        );
      }
    }

    let image = existing.image;

    if (file) {
      image = await this.uploadService.uploadSingle(file);

      if (existing.image) {
        try {
          await this.uploadService.deleteImages([existing.image]);
        } catch (error) {
          console.error('Failed to delete old blog post image:', error);
        }
      }
    }

    Object.assign(existing, dto, { image });

    return existing.save();
  }

  async remove(id: string) {
    const post = await this.blogPostModel.findByIdAndDelete(id);

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    if (post.image) {
      await this.uploadService.deleteImages([post.image]);
    }

    return post;
  }
}