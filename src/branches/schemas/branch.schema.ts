import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from 'src/common/localization/schemas/localized-text.schema';

export const NO_ORDER = Number.MAX_SAFE_INTEGER;

@Schema({ timestamps: true })
export class Branch {
  @Prop({ type: LocalizedTextSchema, required: true })
  name: LocalizedText; 

  @Prop({ type: LocalizedTextSchema, required: true })
  branchType: LocalizedText; 

  @Prop({ type: LocalizedTextSchema, required: true })
  address: LocalizedText;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: LocalizedTextSchema, required: true })
  workingHours: LocalizedText;

  @Prop({ required: true })
  mapUrl: string;

  @Prop({ default: NO_ORDER })
  order: number;
}

export type BranchDocument = HydratedDocument<Branch>;
export const BranchSchema = SchemaFactory.createForClass(Branch);