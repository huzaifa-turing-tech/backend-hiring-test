import { Controller, Get, Post, Body } from '@nestjs/common';
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

    const audioCall: AudioCallDocument = await this.audioCallService.logCall(
      sid,
      callStatus,
      callDuration,
      audioFileLink,
      from,
    );

    return audioCall;
  }

  @Get('logs')
  async getLogs(): Promise<AudioCallDocument[]> {
    const audioCalls: AudioCallDocument[] =
      await this.audioCallService.getLogs();

    return audioCalls;
  }
}
