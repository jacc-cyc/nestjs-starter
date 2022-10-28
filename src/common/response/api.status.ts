import { ApiProperty } from '@nestjs/swagger';
import { ResponseCode } from './response.code';

export class ErrorStatus {
  @ApiProperty()
  private readonly code: number;
  @ApiProperty()
  private readonly error: string;
  @ApiProperty()
  private readonly message: string | string[];
  @ApiProperty()
  private readonly t: Date;

  constructor(rspStatus = ResponseCode.STATUS_9000_BAD_REQUEST) {
    this.code = rspStatus.getCode;
    this.message = rspStatus.getMessage;
    this.error = rspStatus.getError;
    this.t = new Date();
  }

  get getCode(): number {
    return this.code;
  }

  get getMessage(): string | string[] {
    return this.message;
  }

  get getError(): string {
    return this.error;
  }

  get getT(): Date {
    return this.t;
  }
}
