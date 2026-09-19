import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './schemas/service.schema';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { StorageModule } from 'src/common/storage/storage.module';
import {
  SubService,
  SubServiceSchema,
} from 'src/sub-services/schemas/sub-service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },
      { name: SubService.name, schema: SubServiceSchema },
    ]),

    StorageModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
   exports: [ServicesService],
})
export class ServicesModule {}
