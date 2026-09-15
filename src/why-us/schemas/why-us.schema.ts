import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LocalizedText, LocalizedTextSchema } from 'src/common/localization/schemas/localized-text.schema';

export type WhyUsDocument = HydratedDocument<WhyUs>;

@Schema({ timestamps: true })
export class WhyUs {
  @Prop({ type: String})
  image: string;

  @Prop({ type: LocalizedTextSchema, required: true })
  title: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  description: LocalizedText;
}

export const WhyUsSchema = SchemaFactory.createForClass(WhyUs);