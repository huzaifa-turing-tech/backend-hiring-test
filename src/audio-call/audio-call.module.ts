import { Module } from '@nestjs/common';
import { AudioCallController } from './audio-call.controller';
import { AudioCallService } from './audio-call.service';

@Module({
  controllers: [AudioCallController],
  providers: [AudioCallService],
})
export class AudioCallModule {}
