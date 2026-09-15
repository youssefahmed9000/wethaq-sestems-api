import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WhyUs, WhyUsDocument } from './schemas/why-us.schema';
import { CreateWhyUsDto } from './dto/create-why-us.dto';
import { UpdateWhyUsDto } from './dto/update-why-us.dto';
import { ApiFeatures } from 'src/common/utils/api-features';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';
import { UploadService } from 'src/common/storage/upload.service';

@Injectable()
export class WhyUsService {
  constructor(
    @InjectModel(WhyUs.name) private whyUsModel: Model<WhyUsDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateWhyUsDto, image?: Express.Multer.File) {
   const imageUrl = image
      ? await this.uploadService.uploadSingle(image)
      : undefined;

    return this.whyUsModel.create({ ...dto, image: imageUrl });
  }

  async findAll(query: BuildQueryDto) {
    const baseQuery = this.whyUsModel.find().lean();

    const features = new ApiFeatures<WhyUs>(baseQuery, query)
      .filter()
      .search(['title.en', 'title.ar', 'description.en', 'description.ar'])
      .sort()
      .limitFields();

    const total = await features.count();
    features.paginate(total);

    const data = await features.exec();

    return {
      pagination: features.paginationResult,
      data,
      
    };
  }
  async findOne(id: string) {
    const item = await this.whyUsModel.findById(id).lean();

    if (!item) {
      throw new NotFoundException('Why-us item not found');
    }

    return item;
  }

  async update(id: string, dto: UpdateWhyUsDto, file?: Express.Multer.File) {
    const existing = await this.whyUsModel.findById(id);

    if (!existing) {
      throw new NotFoundException('Why-us item not found');
    }

    let image = existing.image;

    if (file) {
      image = await this.uploadService.uploadSingle(file);

      if (existing.image) {
        try {
          await this.uploadService.deleteImages([existing.image]);
        } catch (error) {
          console.error('Failed to delete old why-us image:', error);
        }
      }
    }

    Object.assign(existing, dto, { image });

    return existing.save();
  }

  async remove(id: string) {
    const existing = await this.whyUsModel.findById(id);

    if (!existing) {
      throw new NotFoundException('Why-us item not found');
    }

    if (existing.image) {
      try {
        await this.uploadService.deleteImages([existing.image]);
      } catch (error) {
        console.error('Failed to delete why-us image:', error);
      }
    }

    await existing.deleteOne();

    return { message: 'Why-us item deleted successfully' };
  }
}