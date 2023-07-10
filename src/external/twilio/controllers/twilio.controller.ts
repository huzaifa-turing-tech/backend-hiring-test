import { Controller, Post, Res, Req, Header, Body } from '@nestjs/common';
import { TwilioService } from '../services/twilio.service';
import { Request, Response } from 'express';
import { InputDto } from '../dtos';

@Controller('twilio')
export class TwilioController {
  constructor(private twilioService: TwilioService) {}

  @Post('connect')
  @Header('Content-Type', 'text/xml')
  connect(): string {
    const callResponse = this.twilioService.handleConnect();
    console.log(typeof callResponse);
    return callResponse;
  }

  @Post('input')
  @Header('Content-Type', 'text/xml')
  input(@Body() body: InputDto): string {
    const { Digits } = body;

    const inputResponse = this.twilioService.handleInput(Digits);
    return inputResponse;
  }

  @Post('end')
  @Header('Content-Type', 'text/xml')
  end(): string {
    const response = this.twilioService.createEndCallRequest();
    return response;
  }
}
