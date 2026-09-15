import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from 'src/common/localization/schemas/localized-text.schema';

@Schema({ timestamps: true })
export class TeamMember {
  @Prop({ type: LocalizedTextSchema, required: true })
  name: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  role: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  speciality: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  experience: LocalizedText;

  @Prop()
  image?: string; // Cloudinary URL
}

export type TeamMemberDocument = HydratedDocument<TeamMember>;
export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);