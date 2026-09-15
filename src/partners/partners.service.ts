
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partner, PartnerDocument } from './schemas/partner.schema';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { UploadService } from 'src/common/storage/upload.service';
import { ApiFeatures } from 'src/common/utils/api-features';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name)
    private readonly partnerModel: Model<PartnerDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async findAll(query: BuildQueryDto) {
    const baseQuery = this.partnerModel.find().lean();

    const features = new ApiFeatures<Partner>(baseQuery, query)
      .filter()
      .search(['name.en', 'name.ar'])
      .sort()
      .limitFields();

    const total = await features.count();
    features.paginate(total);

    const data = await features.exec();

    return { pagination: features.paginationResult, data };
  }

  async findOne(id: string) {
    const partner = await this.partnerModel.findById(id).lean();

    if (!partner) {
      throw new NotFoundException('Partner not found');
    }

    return partner;
  }

  async create(dto: CreatePartnerDto, file?: Express.Multer.File) {
    const existingPartner = await this.partnerModel.findOne({
      'name.en': dto.name.en,
      'name.ar': dto.name.ar,
    });

    if (existingPartner) {
      throw new NotFoundException('Partner already exists');
    }

    const image = file
      ? await this.uploadService.uploadSingle(file)
      : undefined;

    return this.partnerModel.create({ ...dto, image });
  }

  async update(
    id: string,
    dto: UpdatePartnerDto,
    file?: Express.Multer.File,
  ) {
    const existing = await this.partnerModel.findById(id);

    if (!existing) {
      throw new NotFoundException('Partner not found');
    }

    if (dto.name) {
      const existingPartner = await this.partnerModel.findOne({
        _id: { $ne: id },
        'name.en': dto.name.en,
        'name.ar': dto.name.ar,
      });

      if (existingPartner) {
        throw new NotFoundException(
          'Partner with the same name already exists',
        );
      }
    }

    let image = existing.image;

    if (file) {
      image = await this.uploadService.uploadSingle(file);

      if (existing.image) {
        await this.uploadService.deleteImages([existing.image]);
      }
    }

    Object.assign(existing, dto, { image });

    return existing.save();
  }

  async remove(id: string) {
    const partner = await this.partnerModel.findByIdAndDelete(id);

    if (!partner) {
      throw new NotFoundException('Partner not found');
    }

    if (partner.image) {
      await this.uploadService.deleteImages([partner.image]);
    }

    return partner;
  }
}