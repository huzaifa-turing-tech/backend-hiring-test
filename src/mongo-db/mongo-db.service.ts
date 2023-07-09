import { Injectable } from '@nestjs/common';
import { AudioCall } from './models';

@Injectable()
export class MongoDbService { 
  async createAudioCall(
    sid: string,
    callStatus: string,
    callDuration: string,
    audioFileLink: string,
    from: string,
  ) {
    const newAudioCall = new AudioCall({
      sid: sid,
      callDuration: callDuration,
      callStatus: callStatus,
      audioFileLink: audioFileLink,
      from: from,
    });
    return await newAudioCall.save();
  }
  async getLogs() {
    return await AudioCall.find();
  }
}
