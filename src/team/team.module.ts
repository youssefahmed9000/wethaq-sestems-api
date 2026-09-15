import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMember, TeamMemberSchema } from './schemas/team-member.schema';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { StorageModule } from 'src/common/storage/storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
    StorageModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}