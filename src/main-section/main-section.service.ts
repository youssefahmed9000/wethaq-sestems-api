import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainSection, MainSectionDocument } from './schemas/main-section.schema';
import { UpdateMainSectionDto } from './dto/update-main-section.dto';

@Injectable()
export class MainSectionService {
  constructor(
    @InjectModel(MainSection.name)
    private readonly mainSectionModel: Model<MainSectionDocument>,
  ) {}

  async getMainSection(): Promise<MainSection> {
    const section = await this.mainSectionModel.findOne().lean();
    if (!section) {
      throw new NotFoundException(
        'Main section has not been configured yet. Use PUT /main-section to create it.',
      );
    }
    return section;
  }

  async updateMainSection(dto: UpdateMainSectionDto): Promise<MainSection> {
    return this.mainSectionModel
      .findOneAndUpdate(
        {},
        { $set: dto },
        { new: true, upsert: true, runValidators: true },
      )
      .lean();
  }
}