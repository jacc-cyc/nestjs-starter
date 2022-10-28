import { ApiProperty } from '@nestjs/swagger';
import { ErrorStatus } from './api.status';
import { ResponseStatus } from './response.status';

export class ErrorResponse {
  @ApiProperty()
  private readonly error: ErrorStatus;

  constructor(_data?: any, _rpsStatus?: ResponseStatus) {
    this.error =
      _rpsStatus != null ? new ErrorStatus(_rpsStatus) : new ErrorStatus();
  }

  get getStatus(): ErrorStatus {
    return this.error;
  }
}
