import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { twiml } from 'twilio';
import { URLs, voicePrompts } from '../constants';

@Injectable()
export class TwilioService {
  constructor(private configService: ConfigService) {}

  handleConnect(): string {
    const response = new twiml.VoiceResponse();
    const inputRequest = response.gather({
      numDigits: 1,
      action: URLs.INPUT_URL,
      method: 'POST',
      timeout: 5,
    });
    inputRequest.say(voicePrompts.WELCOME_CALL);

    response.redirect(
      {
        method: 'POST',
      },
      URLs.CONNECT_URL,
    );

    return response.toString();
  }

  handleInput(digits: string): string {
    const response = new twiml.VoiceResponse();

    if (!digits) {
      response.redirect(
        {
          method: 'POST',
        },
        URLs.CONNECT_URL,
      );
    }
    if (digits === '1') {
      response.say(voicePrompts.CONNECTING_SUPPORT);
      response.dial(
        {
          action: URLs.END_URL,
        },
        this.configService.get('TWILIO_PHONE_NUMBER'),
      );
    } else if (digits === '2') {
      response.say(voicePrompts.VOICEMAIL);
      response.record({ transcribe: true, maxLength: 30, playBeep: true });

      response.redirect(
        {
          method: 'POST',
        },
        URLs.END_URL,
      );
    } else {
      response.say(voicePrompts.INVALID_OPTION);
      response.pause({
        length: 2,
      });
      response.redirect(
        {
          method: 'POST',
        },
        URLs.CONNECT_URL,
      );
    }

    return response.toString();
  }

  createEndCallRequest(): string {
    const response = new twiml.VoiceResponse();
    response.say(voicePrompts.GOODBYE);
    response.hangup();

    return response.toString();
  }
}
