import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class LocalizedText {
  @Prop({ required: true, trim: true })
  en: string;

  @Prop({ required: true, trim: true })
  ar: string;
}

export const LocalizedTextSchema = SchemaFactory.createForClass(LocalizedText);