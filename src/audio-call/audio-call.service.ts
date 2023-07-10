import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AudioCall, AudioCallDocument } from './models';
import { Model } from 'mongoose';
import { LogsDto } from './dtos';

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
  async getLogs(query: LogsDto): Promise<AudioCallDocument[]> {
    const { page, limit = 10, from } = query;

    const pipeline: any[] = [{ $sort: { createdAt: 1 } }];
    if (from) {
      pipeline.push({ $match: { from: from } });
    }
    if (page) {
      pipeline.push({ $skip: page * limit });
    }
    pipeline.push({
      $limit: limit,
    });
    return this.audioCallModule.aggregate(pipeline);
  }
}
