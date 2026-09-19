import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubService, SubServiceSchema } from './schemas/sub-service.schema';
import { SubServicesService } from './sub-services.service';
import { SubServicesController } from './sub-services.controller';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubService.name, schema: SubServiceSchema },
    ]),
    ServicesModule,
  ],
  controllers: [SubServicesController],
  providers: [SubServicesService],
})
export class SubServicesModule {}
