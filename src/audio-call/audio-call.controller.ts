import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AudioCallService } from './audio-call.service';

@Controller('audioCall')
export class AudioCallController {
  constructor(private audioCallService: AudioCallService) {}

  //This is a dummy route
  @Get()
  dummy() {
    return this.audioCallService.dummy();
  }

  @Post('connect')
  connect(@Res() res: Response) {
    const callResponse = this.audioCallService.handleConnect();

    res.type('text/xml');
    return res.send(callResponse);
  }

  @Post('input')
  input(@Res() res: Response, @Req() req: Request) {
    const { Digits } = req.body;

    const inputResponse = this.audioCallService.handleInput(Digits);

    res.type('text/xml');
    return res.send(inputResponse);
  }

  @Post('end')
  end(@Res() res: Response) {
    const response = this.audioCallService.createEndCallRequest();
    res.type('text/xml');
    return res.status(200).send(response);
  }
  @Post('status')
  status(@Res() res: Response, @Req() req: Request) {
    const {
      CallSid: sid,
      CallStatus: callStatus,
      CallDuration: callDuration,
      RecordingUrl: audioFileLink,
      From: from,
    } = req.body;
    console.log(req.body);
    this.audioCallService.logCall(
      sid,
      callStatus,
      callDuration,
      audioFileLink,
      from,
    );
    res.status(200).send('Saved');
  }
  @Get('logs')
  getLogs(@Res() res: Response) {
    const audioCalls = this.audioCallService.getLogs();

    return res.status(200).json(audioCalls);
  }
}
