import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { twiml } from 'twilio';
import { voicePrompts, URLs } from 'src/external/twilio/constants';
import { InjectModel } from '@nestjs/mongoose';
import { AudioCall } from './models';
import { Model } from 'mongoose';

@Injectable({})
export class AudioCallService {
  constructor(
    @InjectModel('audio-calls') private audioCallModule: Model<AudioCall>,
  ) {}

  async logCall(
    sid: string,
    callStatus: string,
    callDuration: string,
    audioFileLink: string,
    from: string,
  ) {
    const newAudioCall = new this.audioCallModule({
      sid: sid,
      callDuration: callDuration,
      callStatus: callStatus,
      audioFileLink: audioFileLink,
      from: from,
    });
    return await newAudioCall.save();
  }
  async getLogs() {
    const logs = await this.audioCallModule.find();

    return logs;
  }
}
