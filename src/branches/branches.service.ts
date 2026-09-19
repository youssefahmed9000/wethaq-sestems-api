import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch, BranchDocument } from './schemas/branch.schema';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiFeatures } from 'src/common/utils/api-features';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch.name)
    private readonly branchModel: Model<BranchDocument>,
  ) {}

  async create(dto: CreateBranchDto) {
    return this.branchModel.create(dto);
  }

  async findAll(query: BuildQueryDto) {
    if (!query.sort) {
      query.sort = 'order,-createdAt';
    }

    const baseQuery = this.branchModel.find().lean();

    const features = new ApiFeatures<Branch>(baseQuery, query)
      .filter()
      .search(['name.en', 'name.ar', 'address.en', 'address.ar'])
      .sort()
      .limitFields();

    const total = await features.count();
    features.paginate(total);

    const data = await features.exec();

    return { pagination: features.paginationResult, data };
  }

  async findOne(id: string) {
    const branch = await this.branchModel.findById(id).lean();

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return branch;
  }

  async update(id: string, dto: UpdateBranchDto) {
    const branch = await this.branchModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return branch;
  }

  async remove(id: string) {
    const branch = await this.branchModel.findByIdAndDelete(id).lean();

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return branch;
  }
}