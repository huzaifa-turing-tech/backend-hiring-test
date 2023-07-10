import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AudioCall, AudioCallDocument } from './models';
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
  ): Promise<AudioCallDocument> {
    const newAudioCall = new this.audioCallModule({
      sid: sid,
      callDuration: callDuration,
      callStatus: callStatus,
      audioFileLink: audioFileLink,
      from: from,
    });

    return newAudioCall.save();
  }
  async getLogs(): Promise<AudioCallDocument[]> {
    return this.audioCallModule.find();
  }
}
