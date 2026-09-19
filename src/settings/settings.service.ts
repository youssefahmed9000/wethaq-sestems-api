import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/setting.schema';
import { UpdateSettingsDto } from './dto/update-setting.dto';


@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly settingsModel: Model<SettingsDocument>,
  ) {}

  async getSettings(): Promise<Settings> {
    const settings = await this.settingsModel.findOne().lean();
    if (settings) return settings;

    // أول تشغيل للسيستم: نعمل سجل فاضي بقيم مبدئية
    const created = await this.settingsModel.create({
      officeName: { en: '', ar: '' },
      tagline: { en: '', ar: '' },
      mainPhone: '',
      whatsapp: '',
      email: '',
      riyadhAddress: { en: '', ar: '' },
      jeddahAddress: { en: '', ar: '' },
      dammamAddress: { en: '', ar: '' },
    });
    return created.toObject();
  }

  async updateSettings(dto: UpdateSettingsDto): Promise<Settings> {
    const updated = await this.settingsModel
      .findOneAndUpdate(
        {},
        { $set: dto },
        { new: true, upsert: true, runValidators: true },
      )
      .lean();
    return updated;
  }
}