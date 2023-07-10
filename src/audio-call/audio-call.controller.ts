import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AudioCallService } from './audio-call.service';
import type { AudioCallDocument } from './models';

@Controller('audioCall')
export class AudioCallController {
  constructor(private audioCallService: AudioCallService) {}

  @Post('status')
  async status(@Req() req: Request): Promise<AudioCallDocument> {
    const {
      CallSid: sid,
      CallStatus: callStatus,
      CallDuration: callDuration,
      RecordingUrl: audioFileLink,
      From: from,
    } = req.body;
    console.log(req.body);
    const audioCall = await this.audioCallService.logCall(
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
    const audioCalls = await this.audioCallService.getLogs();

    return audioCalls;
  }
}
