import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { AudioCall } from './models';

@Injectable()
export class MongoDbService {
  constructor(private configService: ConfigService) {
    this.createMongoDbConnection();
  }
  async createMongoDbConnection() {
    try {
      const connection = await mongoose.connect(
        this.configService.get('MONGO_DB_URI'),
      );
      console.log('Connected to MongoDB');
    } catch (e) {
      console.log('Error connecting to the database');
    }
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
