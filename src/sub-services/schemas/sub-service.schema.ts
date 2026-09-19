import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { LocalizedText, LocalizedTextSchema } from 'src/common/localization/schemas/localized-text.schema';

export type SubServiceDocument = HydratedDocument<SubService>;

@Schema({ timestamps: true })
export class SubService {
  @Prop({ type: LocalizedTextSchema, required: true })
  name: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  description: LocalizedText;

  @Prop({ type: Types.ObjectId, ref: 'Service', required: true, index: true })
  service: Types.ObjectId;


}

export const SubServiceSchema = SchemaFactory.createForClass(SubService);