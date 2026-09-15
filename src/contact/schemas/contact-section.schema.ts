import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from 'src/common/localization/schemas/localized-text.schema';

@Schema({ _id: false })
export class SocialLinks {
  @Prop({ trim: true })
  linkedin?: string;

  @Prop({ trim: true })
  instagram?: string;

  @Prop({ trim: true })
  twitter?: string; // X

  @Prop({ trim: true })
  facebook?: string;
}
export const SocialLinksSchema = SchemaFactory.createForClass(SocialLinks);

@Schema({ timestamps: true })
export class ContactSection {
  @Prop({ type: LocalizedTextSchema, required: true })
  heading: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  body: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  button1Text: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  button2Text: LocalizedText;

  @Prop({ type: SocialLinksSchema, default: {} })
  socialLinks: SocialLinks;
}

export type ContactSectionDocument = HydratedDocument<ContactSection>;
export const ContactSectionSchema =
  SchemaFactory.createForClass(ContactSection);