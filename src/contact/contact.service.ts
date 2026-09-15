import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ContactSection,
  ContactSectionDocument,
} from './schemas/contact-section.schema';
import { UpdateContactSectionDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(ContactSection.name)
    private readonly contactSectionModel: Model<ContactSectionDocument>,
  ) {}

  async find() {
    
   return this.contactSectionModel.findOne().lean();
 
  }

  async update(dto: UpdateContactSectionDto) {
    return this.contactSectionModel
      .findOneAndUpdate({}, { $set: dto }, { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true })
      .lean();
  }
}