// import mongoose from 'mongoose';

// const audiCallSchema = new mongoose.Schema(
//   {
//     sid: { type: String, required: true, unique: true },
//     callStatus: { type: String, required: true },
//     audioFileLink: { type: String },
//     callDuration: { type: Number, required: true },
//     from: { type: String, required: true },
//   },
//   { timestamps: true },
// );

// const AudioCall = mongoose.model('Call', audiCallSchema);

// export { AudioCall };

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AudioCallDocument = HydratedDocument<AudioCall>;

@Schema({
  timestamps: true,
})
export class AudioCall {
  @Prop({
    required: true,
    unique: true,
  })
  sid: string;

  @Prop({
    required: true,
  })
  callStatus: string;

  @Prop()
  audioFileLink: string;

  @Prop({
    required: true,
  })
  callDuration: number;

  @Prop({
    required: true,
  })
  from: string;
}

export const AudioCallSchema = SchemaFactory.createForClass(AudioCall);
