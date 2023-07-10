import { Module } from '@nestjs/common';
import { TwilioController } from './controllers/twilio.controller';
import { TwilioService } from './services/twilio.service';

@Module({
  controllers: [TwilioController],
  providers: [TwilioService],
})
export class TwilioModule {}
