import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AudioCallService } from './audio-call.service';

@Controller('audioCall')
export class AudioCallController {
  constructor(private audioCallService: AudioCallService) {}

  @Post('status')
  async status(@Res() res: Response, @Req() req: Request) {
    const {
      CallSid: sid,
      CallStatus: callStatus,
      CallDuration: callDuration,
      RecordingUrl: audioFileLink,
      From: from,
    } = req.body;
    console.log(req.body);
    await this.audioCallService.logCall(
      sid,
      callStatus,
      callDuration,
      audioFileLink,
      from,
    );
    res.status(200).send('Saved');
  }
  @Get('logs')
  async getLogs(@Res() res: Response) {
    const audioCalls = await this.audioCallService.getLogs();

    return res.status(200).json(audioCalls);
  }
}
