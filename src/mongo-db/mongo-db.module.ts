import { Global, Module } from '@nestjs/common';
import { MongoDbService } from './mongo-db.service';

@Global()
@Module({
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbModule {}
