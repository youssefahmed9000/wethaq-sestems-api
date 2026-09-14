
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from 'src/common/localization/schemas/localized-text.schema';

@Schema({ timestamps: true })
export class Statistic {
  @Prop({ type: LocalizedTextSchema, required: true })
  label: LocalizedText;

  @Prop({ required: true, trim: true })
  value: string; // e.g. "+500", "98%", "15+" — same in both languages
}

export type StatisticDocument = HydratedDocument<Statistic>;
export const StatisticSchema = SchemaFactory.createForClass(Statistic);