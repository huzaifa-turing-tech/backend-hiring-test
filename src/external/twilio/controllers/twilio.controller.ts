import { Controller, Post, Res, Req } from '@nestjs/common';
import { TwilioService } from '../services/twilio.service';
import { Request, Response } from 'express';

@Controller('twilio')
export class TwilioController {
  constructor(private twilioService: TwilioService) {}
  @Post('connect')
  connect(@Res() res: Response) {
    const callResponse = this.twilioService.handleConnect();

    res.type('text/xml');
    return res.send(callResponse);
  }

  @Post('input')
  input(@Res() res: Response, @Req() req: Request) {
    const { Digits } = req.body;

    const inputResponse = this.twilioService.handleInput(Digits);

    res.type('text/xml');
    return res.send(inputResponse);
  }

  @Post('end')
  end(@Res() res: Response) {
    const response = this.twilioService.createEndCallRequest();
    res.type('text/xml');
    return res.status(200).send(response);
  }
}
