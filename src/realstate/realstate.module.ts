import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RealstateController } from './realstate.controller';
import { QueryRealstateService } from './services/query.realstate.service';
import { CustomHttpModule } from '../http/http.module';

@Module({
  imports: [CustomHttpModule, ConfigModule],
  controllers: [RealstateController],
  providers: [QueryRealstateService],
  exports: [QueryRealstateService],
})
export class RealstateModule {}
