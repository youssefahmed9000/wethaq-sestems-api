import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from 'src/common/localization/schemas/localized-text.schema';

export type SettingsDocument = Settings & Document;

@Schema({ timestamps: true })
export class Settings {
  @Prop({ type: LocalizedTextSchema, required: true })
  officeName: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  tagline: LocalizedText;

  @Prop({ trim: true })
  extraPhone?: string;

  @Prop({ required: true, trim: true })
  mainPhone: string;

  @Prop({ required: true, trim: true })
  whatsapp: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;


}

export const SettingsSchema = SchemaFactory.createForClass(Settings);