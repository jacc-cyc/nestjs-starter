import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { RedisHealthIndicator } from '@liaoliaots/nestjs-redis/health';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';
import Redis from 'ioredis';
import { ApiResponseSchema } from '../../common/decorator/swagger.decorator';
import { ResponseCode } from '../../common/response/response.code';
import { AppException } from '../../common/response/app.exception';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create.demo.dto';
import { DemoDto } from './dto/demo.dto';
import { GetListDemoDto } from './dto/get.list.demo.dto';
import { UpdateDemoDto } from './dto/update.demo.dto';

@ApiTags('demo')
@Controller('demo')
export class DemoController {
  constructor(
    private readonly demoService: DemoService,
    private readonly health: HealthCheckService,
    private readonly redisIndicator: RedisHealthIndicator,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post()
  @ApiResponseSchema(HttpStatus.CREATED, 'OK')
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demoService.create(createDemoDto);
  }

  /**
   *
   * Normal Response Success with DTO
   */
  @Get('list')
  @ApiResponseSchema(HttpStatus.OK, 'OK', GetListDemoDto)
  async findAll() {
    return new GetListDemoDto(
      (await this.demoService.findAll()).map(
        (demoDto) => new DemoDto(demoDto.name, demoDto.description),
      ),
    );
  }

  @Get('error')
  @ApiResponseSchema(HttpStatus.OK, 'OK')
  findAllWithError() {
    throw new AppException(ResponseCode.STATUS_9000_BAD_REQUEST);
  }

  @Get(':id')
  @ApiResponseSchema(HttpStatus.OK, 'OK')
  findOne(@Param('id') id: string) {
    return this.demoService.findOne(id);
  }

  @Patch(':id')
  @ApiResponseSchema(HttpStatus.NO_CONTENT, 'OK')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demoService.update(id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoService.remove(id);
  }

  /**
   *
   * Redis Demo
   *
   */
  @Get('redis/:key')
  async get(@Param('key') key: string): Promise<any> {
    const result = await this.redis.get(key);
    return JSON.parse(result);
  }

  @Post('redis/:key')
  async put(
    @Param('key') key: string,
    @Body() data: UpdateDemoDto,
  ): Promise<any> {
    return await this.redis.set(key, JSON.stringify(data));
  }

  @Get('redis/health')
  @HealthCheck()
  async healthChecks(): Promise<HealthCheckResult> {
    return await this.health.check([
      () =>
        this.redisIndicator.checkHealth('redis', {
          type: 'redis',
          client: this.redis,
          timeout: 500,
        }),
    ]);
  }
}
