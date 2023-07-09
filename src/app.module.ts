import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AudioCallModule } from './audio-call/audio-call.module';
import { MongoDbModule } from './mongo-db/mongo-db.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(new ConfigService().get("MONGO_DB_URI")),
    AudioCallModule,
    MongoDbModule,
  ],
})
export class AppModule {}