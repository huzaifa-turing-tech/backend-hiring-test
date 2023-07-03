import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { AudioCall } from './models';

@Injectable()
export class MongoDbService {
  constructor(private configService: ConfigService) {
    mongoose
      .connect(this.configService.get('MONGO_DB_URI'))
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.log('Could not connect to mongoDB', error);
      });
  }
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
