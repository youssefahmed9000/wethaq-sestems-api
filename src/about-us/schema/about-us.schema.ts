import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from 'src/common/localization/schemas/localized-text.schema';

@Schema({ timestamps: true })
export class AboutUs {

  @Prop({ required: true, unique: true, default: 'about-us' })
  singletonKey: string;

  @Prop({ type: LocalizedTextSchema, required: true })
  tag: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  heading: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  paragraph1: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  paragraph2: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  vision: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  mission: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  values: LocalizedText;

  @Prop()
  image?: string; // Cloudinary URL
}

export type AboutUsDocument = HydratedDocument<AboutUs>;
export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);