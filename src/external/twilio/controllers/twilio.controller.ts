import { Controller, Post, Res, Req, Header } from '@nestjs/common';
import { TwilioService } from '../services/twilio.service';
import { Request, Response } from 'express';

@Controller('twilio')
export class TwilioController {
  constructor(private twilioService: TwilioService) {}

  @Post('connect')
  @Header('Content-Type', 'text/xml')
  connect(@Res() res: Response) {
    const callResponse = this.twilioService.handleConnect();

    return callResponse;
  }

  @Post('input')
  @Header('Content-Type', 'text/xml')
  input(@Res() res: Response, @Req() req: Request) {
    const { Digits } = req.body;

    const inputResponse = this.twilioService.handleInput(Digits);

    return inputResponse;
  }

  @Post('end')
  @Header('Content-Type', 'text/xml')
  end(@Res() res: Response) {
    const response = this.twilioService.createEndCallRequest();

    return response;
  }
}
