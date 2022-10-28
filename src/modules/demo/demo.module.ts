import { RedisHealthModule } from '@liaoliaots/nestjs-redis/health';
import { Logger, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { RepositoryModule } from 'src/database/repositories/repository.module';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

@Module({
  imports: [RepositoryModule, TerminusModule, RedisHealthModule],
  controllers: [DemoController],
  providers: [Logger, DemoService],
})
export class DemoModule {}
