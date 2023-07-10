import {
  Controller,
  Get,
  Post,
  Body,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { AudioCallService } from './audio-call.service';
import type { AudioCallDocument } from './models';
import { StatusDto } from './dtos';

@Controller('audioCall')
export class AudioCallController {
  constructor(private audioCallService: AudioCallService) {}

  @Post('status')
  async status(@Body() body: StatusDto): Promise<AudioCallDocument> {
    const {
      CallSid: sid,
      CallStatus: callStatus,
      CallDuration: callDuration,
      RecordingUrl: audioFileLink,
      From: from,
    } = body;
    console.log(body);

    try {
      const audioCall: AudioCallDocument = await this.audioCallService.logCall(
        sid,
        callStatus,
        callDuration,
        audioFileLink,
        from,
      );

      return audioCall;
    } catch (error: any) {
      if (error.code == 11000) {
        throw new ForbiddenException('Call with SID already exists');
      } else {
        throw new BadRequestException('Something bad happened');
      }
    }
  }

  @Get('logs')
  async getLogs(): Promise<AudioCallDocument[]> {
    const audioCalls: AudioCallDocument[] =
      await this.audioCallService.getLogs();

    return audioCalls;
  }
}
