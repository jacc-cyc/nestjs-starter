import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DemoModule } from './modules/demo/demo.module';
import appConfig from './config/app.config';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter } from './common/exceptionFilters/all.exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BookModule } from './modules/book/book.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          if (configService.get<string>('app.env') === 'localhost') {
            return {
              config: {
                host: configService.get<string>('services.redis.host'),
                port: configService.get<number>('services.redis.port'),
              },
            };
          }
          return {
            config: {
              password: configService.get<string>('services.redis.password'),
              url: `rediss://${configService.get<string>(
                'services.redis.host',
              )}:${configService.get<number>('services.redis.port')}`,
            },
          };
        },
        inject: [ConfigService],
      },
      true,
    ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('services.database.uri'),
          dbName: 'starter-test',
        };
      },
      inject: [ConfigService],
    }),
    DemoModule,
    HealthModule,
    UserModule,
    BookModule,
    PostModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
