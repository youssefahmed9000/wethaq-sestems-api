import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiFeatures } from 'src/common/utils/api-features'; // ⚠️ confirm actual path
import { UploadService } from 'src/common/storage/upload.service';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async findAll(query:BuildQueryDto) {
    const baseQuery = this.serviceModel.find().lean();

    const features = new ApiFeatures<Service>(baseQuery,query)
      .filter()
      .search(['name.en', 'name.ar'])
      .sort()

    const total = await features.count();
    features.paginate(total);

    const data = await features.exec();

       return {
      pagination: features.paginationResult,
      data,
    };
  }

  async findOne(id: string) {
    const service = await this.serviceModel.findById(id).lean();

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async create(dto: CreateServiceDto, file?: Express.Multer.File) {
    const existing = await this.serviceModel
      .findOne({ slug: dto.slug })
      .lean();

    if (existing) {
      throw new ConflictException(
        `Service with slug "${dto.slug}" already exists`,
      );
    }

    let image: string | undefined;

    if (file) {
      image = await this.uploadService.uploadSingle(file);
    }

    return this.serviceModel.create({
      ...dto,
      image,
    });
  }

async update(id: string, dto: UpdateServiceDto, file?: Express.Multer.File) {
  const existing = await this.serviceModel.findById(id);

  if (!existing) {
    throw new NotFoundException('Service not found');
  }

  if (dto.slug && dto.slug !== existing.slug) {
    const slugTaken = await this.serviceModel
      .findOne({ slug: dto.slug, _id: { $ne: id } })
      .lean();

    if (slugTaken) {
      throw new ConflictException(
        `Service with slug "${dto.slug}" already exists`,
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
        console.error('Failed to delete old service image:', error);
      }
    }
  }

  Object.assign(existing, dto, { image });

  return existing.save();
}

  async remove(id: string): Promise<{message: string}> {
    const service = await this.serviceModel.findByIdAndDelete(id);

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.image) {
      await this.uploadService.deleteImages([service.image]);
    }

    return { message: 'Service deleted successfully' };
  }
}