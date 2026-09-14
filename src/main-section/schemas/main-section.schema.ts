import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from 'src/common/localization/schemas/localized-text.schema';

export type MainSectionDocument = MainSection & Document;

@Schema({ timestamps: true })
export class MainSection {
  @Prop({ type: LocalizedTextSchema, required: true })
  tag: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  headingLine1: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  headingLine2: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  subtitle: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  button1Text: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  button2Text: LocalizedText;
}

export const MainSectionSchema = SchemaFactory.createForClass(MainSection);