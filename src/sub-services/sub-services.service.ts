import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubService, SubServiceDocument } from './schemas/sub-service.schema';
import { CreateSubServiceDto } from './dto/create-sub-service.dto';
import { UpdateSubServiceDto } from './dto/update-sub-service.dto';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class SubServicesService {
  constructor(
    @InjectModel(SubService.name)
    private readonly subServiceModel: Model<SubServiceDocument>,
    private readonly servicesService: ServicesService,
  ) {}

  async create(dto: CreateSubServiceDto) {
    const service = await this.servicesService.findOne(dto.service);
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    await this.checkNameUniqueness(dto.service.toString(), dto.name);

    return this.subServiceModel.create(dto );
  }

  async findAllByService(serviceId: string) {
    const service = await this.servicesService.findOne(serviceId);
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return this.subServiceModel.find({ service: serviceId }).lean();
  }

  async findOne(id: string) {
    const subService = await this.subServiceModel.findById(id).lean();
    if (!subService) {
      throw new NotFoundException('Sub-service not found');
    }
    return subService;
  }

async update(id: string, dto: UpdateSubServiceDto) {
  const subService = await this.subServiceModel.findById(id);
  if (!subService) {
    throw new NotFoundException('Sub-service not found');
  }

  let targetServiceId = subService.service.toString();

  if (dto.service && dto.service !== targetServiceId) {
    const service = await this.servicesService.findOne(dto.service);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    targetServiceId = service._id.toString();
  }

  if (dto.name) {
    await this.checkNameUniqueness(targetServiceId, dto.name, id);
  }

  Object.assign(subService, dto, { service: targetServiceId });
  return subService.save();
}
  async remove(id: string):Promise<{ message: string }> {
    const subService = await this.subServiceModel.findByIdAndDelete(id);
    if (!subService) {
      throw new NotFoundException('Sub-service not found');
    }
    return { message: 'Sub-service deleted successfully' };
  }

  private async checkNameUniqueness(
    serviceId: string,
    name: { en: string; ar: string },
    excludeId?: string,
  ) {
    const exists = await this.subServiceModel.exists({
      service: serviceId,
      $or: [{ 'name.en': name.en }, { 'name.ar': name.ar }],
      ...(excludeId && { _id: { $ne: excludeId } }),
    });

    if (exists) {
      throw new ConflictException(
        'A sub-service with this name already exists for this service',
      );
    }
  }
}