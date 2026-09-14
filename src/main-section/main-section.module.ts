import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainSection, MainSectionSchema } from './schemas/main-section.schema';
import { MainSectionService } from './main-section.service';
import { MainSectionController } from './main-section.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MainSection.name, schema: MainSectionSchema }]),
  ],
  controllers: [MainSectionController],
  providers: [MainSectionService],
  exports: [MainSectionService],
})
export class MainSectionModule {}