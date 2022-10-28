import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseSchema } from '../../common/decorator/swagger.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get('')
  @ApiResponseSchema(HttpStatus.OK, 'OK')
  @Get()
  health() {
    return 'OK';
  }
}
