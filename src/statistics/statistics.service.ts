import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statistic, StatisticDocument } from './schemas/statistic.schema';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { ApiFeatures } from 'src/common/utils/api-features';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistic.name)
    private readonly statisticModel: Model<StatisticDocument>,
  ) {}
  async create(dto: CreateStatisticDto): Promise<StatisticDocument> {
    return this.statisticModel.create(dto);
  }
  async findAll(query: BuildQueryDto) {
    const baseQuery = this.statisticModel.find().lean();

    const features = new ApiFeatures<Statistic>(baseQuery, query)
      .filter()
      .search(['label.en', 'label.ar'])
      .sort()

    const total = await features.count();
    features.paginate(total);

    const data = await features.exec();

    return {
      pagination: features.paginationResult,
      data,
    };
  }

  async findOne(id: string): Promise<StatisticDocument> {
    const item = await this.statisticModel.findById(id).lean();

    if (!item) {
      throw new NotFoundException('Statistic not found');
    }

    return item;
  }

  async update(
    id: string,
    dto: UpdateStatisticDto,
  ): Promise<StatisticDocument> {
    const updated = await this.statisticModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true, runValidators: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Statistic not found');
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.statisticModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException('Statistic not found');
    }
  }
}
