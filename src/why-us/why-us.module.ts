// src/modules/why-us/why-us.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhyUsService } from './why-us.service';
import { WhyUsController } from './why-us.controller';
import { WhyUs, WhyUsSchema } from './schemas/why-us.schema';
import { StorageModule } from 'src/common/storage/storage.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: WhyUs.name, schema: WhyUsSchema }]),
    StorageModule,
  ],
  controllers: [WhyUsController],
  providers: [WhyUsService],
  exports: [WhyUsService],
})
export class WhyUsModule {}