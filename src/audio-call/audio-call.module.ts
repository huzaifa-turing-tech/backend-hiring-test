import { Module } from '@nestjs/common';
import { AudioCallController } from './audio-call.controller';
import { AudioCallService } from './audio-call.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AudioCallSchema } from './models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'audio-calls',
        schema: AudioCallSchema,
      },
    ]),
  ],
  controllers: [AudioCallController],
  providers: [AudioCallService],
})
export class AudioCallModule {}
