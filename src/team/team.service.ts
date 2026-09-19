import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from './schemas/team-member.schema';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { UploadService } from 'src/common/storage/upload.service';
import { ApiFeatures } from 'src/common/utils/api-features';
import { BuildQueryDto } from 'src/common/dto/base-query.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(TeamMember.name)
    private readonly teamMemberModel: Model<TeamMemberDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateTeamMemberDto, file?: Express.Multer.File) {
    const image = file
      ? await this.uploadService.uploadSingle(file)
      : undefined;

    return this.teamMemberModel.create({ ...dto, image });
  }

  async findAll(query: BuildQueryDto) {
    if (!query.sort) {
      query.sort = 'order,-createdAt';
    }

    const baseQuery = this.teamMemberModel.find().lean();

    const features = new ApiFeatures<TeamMember>(baseQuery, query)
      .filter()
      .search(['name.en', 'name.ar', 'role.en', 'role.ar'])
      .sort()
      .limitFields();

    const total = await features.count();
    features.paginate(total);

    const data = await features.exec();

    return { pagination: features.paginationResult, data };
  }

  async findOne(id: string) {
    const member = await this.teamMemberModel.findById(id).lean();

    if (!member) {
      throw new NotFoundException('Team member not found');
    }

    return member;
  }

  async update(
    id: string,
    dto: UpdateTeamMemberDto,
    file?: Express.Multer.File,
  ) {
    const existing = await this.teamMemberModel.findById(id);

    if (!existing) {
      throw new NotFoundException('Team member not found');
    }

    let image = existing.image;

    if (file) {
      image = await this.uploadService.uploadSingle(file);

      if (existing.image) {
        try {
          await this.uploadService.deleteImages([existing.image]);
        } catch (error) {
          console.error('Failed to delete old team member image:', error);
        }
      }
    }

    Object.assign(existing, dto, { image });

    return existing.save();
  }

  async remove(id: string): Promise<{ message: string }> {
    const member = await this.teamMemberModel.findByIdAndDelete(id);

    if (!member) {
      throw new NotFoundException('Team member not found');
    }

    if (member.image) {
      await this.uploadService.deleteImages([member.image]);
    }

    return { message: 'Team member deleted successfully' };
  }
}
