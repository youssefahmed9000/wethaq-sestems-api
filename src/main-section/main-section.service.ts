import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MainSection,
  MainSectionDocument,
} from './schemas/main-section.schema';
import { UpdateMainSectionDto } from './dto/update-main-section.dto';
import { REDIS_CLIENT } from 'src/common/redis/redis.provider';
import { Redis } from 'ioredis';

@Injectable()
export class MainSectionService {
  private readonly cacheKey = 'main-section';
  private readonly cacheTtl = 300; // 5 minutes
  constructor(
    @InjectModel(MainSection.name)
    private readonly mainSectionModel: Model<MainSectionDocument>,
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  async getMainSection(): Promise<MainSection> {
    // 1. Try Redis first
    const cached = await this.redis.get(this.cacheKey);

    if (cached) {
      return JSON.parse(cached) as MainSection;
    }
    // 2. Cache miss: read from MongoDB
    const section = await this.mainSectionModel.findOne().lean();
    if (!section) {
      throw new NotFoundException(
        'Main section has not been configured yet. Use PUT /main-section to create it.',
      );
    }

    // 2. Cache the result in Redis
    await this.redis.set(
      this.cacheKey,
      JSON.stringify(section),
      'EX',
      this.cacheTtl,
    );

    return section;
  }

  async updateMainSection(dto: UpdateMainSectionDto): Promise<MainSection> {
    // 1. Update MongoDB first
    const updatedSection = await this.mainSectionModel
      .findOneAndUpdate(
        {},
        { $set: dto },
        {
          new: true,
          upsert: true,
          runValidators: true,
        },
      )
      .lean()
      .exec();

    // 2. Invalidate old cache
    await this.redis.del(this.cacheKey);

    return updatedSection as MainSection;
  }
}
