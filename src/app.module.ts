import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AudioCallModule } from './audio-call/audio-call.module';
import { MongoDbModule } from './mongo-db/mongo-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AudioCallModule,
    MongoDbModule,
  ],
})
export class AppModule {}
