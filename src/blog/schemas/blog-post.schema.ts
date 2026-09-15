import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from 'src/common/localization/schemas/localized-text.schema';

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ type: LocalizedTextSchema, required: true })
  category: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  title: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  date: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  readTime: LocalizedText;

  @Prop({ type: LocalizedTextSchema, required: true })
  articleBody: LocalizedText;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  slug: string;

  @Prop()
  image?: string; // Cloudinary URL

  @Prop({type:Types.ObjectId, ref:'User', required:true})
  createdBy: Types.ObjectId; // User ID of the creator

  @Prop({ type: Types.ObjectId, ref: 'User'})  
  updatedBy: Types.ObjectId; // User ID of the last updater
}

export type BlogPostDocument = HydratedDocument<BlogPost>;
export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);