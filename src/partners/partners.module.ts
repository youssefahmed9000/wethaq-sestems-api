import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from './schemas/partner.schema';
import { PartnerController } from './partners.controller';
import { PartnerService } from './partners.service';
import { StorageModule } from 'src/common/storage/storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }]),
    StorageModule,
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnersModule {}