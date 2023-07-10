import { IsNotEmpty, IsString } from 'class-validator';

export class StatusDto {
  @IsString()
  @IsNotEmpty()
  CallSid: string;

  @IsString()
  @IsNotEmpty()
  CallStatus: string;

  @IsString()
  @IsNotEmpty()
  CallDuration: string;

  @IsString()
  RecordingUrl: string;

  @IsString()
  @IsNotEmpty()
  From: string;
}
