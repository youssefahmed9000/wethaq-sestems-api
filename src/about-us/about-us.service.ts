import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { AboutUs, AboutUsDocument } from './schema/about-us.schema';
import { UploadService } from 'src/common/storage/upload.service';

const SINGLETON_FILTER = { singletonKey: 'about-us' };

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name)
    private readonly aboutUsModel: Model<AboutUsDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async getAboutUs(): Promise<AboutUsDocument | null> {
    return this.aboutUsModel.findOne(SINGLETON_FILTER).lean();
  }

  async updateAboutUs(
    dto: UpdateAboutUsDto,
    imageFile?: Express.Multer.File,
  ): Promise<AboutUsDocument> {
    const updatePayload: Record<string, unknown> = { ...dto };

    if (imageFile) {
      const existing = await this.aboutUsModel.findOne(SINGLETON_FILTER).lean();

      const newImageUrl = await this.uploadService.uploadSingle(imageFile);

      updatePayload.image = newImageUrl;

      if (existing?.image) {
        await this.uploadService.deleteImages([existing.image]);
      }
    }

    return this.aboutUsModel
      .findOneAndUpdate(
        SINGLETON_FILTER,
        {
          $set: updatePayload,
          $setOnInsert: SINGLETON_FILTER,
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        },
      )
      .exec();
  }
}
