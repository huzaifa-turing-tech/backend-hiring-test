import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AudioCallModule } from './audio-call/audio-call.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TwilioModule } from './external/twilio/twilio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(new ConfigService().get('MONGO_DB_URI')),
    AudioCallModule,
    TwilioModule,
  ],
})
export class AppModule {}
