import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { twiml } from 'twilio';
import { voicePrompts, URLs } from 'src/constants';
import { MongoDbService } from 'src/mongo-db/mongo-db.service';

@Injectable({})
export class AudioCallService {
  constructor(
    private configService: ConfigService,
    private mongoDbService: MongoDbService,
  ) {}
  dummy() {
    return {
      msg: 'Hello',
      sid: this.configService.get('TWILIO_ACCOUNT_SID'),
      authToken: this.configService.get('TWILIO_AUTH_TOKEN'),
    };
  }
  handleConnect() {
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
  handleInput(digits: string) {
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
  async logCall(
    sid: string,
    callStatus: string,
    callDuration: string,
    audioFileLink: string,
    from: string,
  ) {
    return this.mongoDbService.createAudioCall(
      sid,
      callStatus,
      callDuration,
      audioFileLink,
      from,
    );
  }
  async getLogs() {
    return this.mongoDbService.getLogs();
  }

  createEndCallRequest = () => {
    const response = new twiml.VoiceResponse();
    response.say(voicePrompts.GOODBYE);
    response.hangup();

    return response.toString();
  };
}
