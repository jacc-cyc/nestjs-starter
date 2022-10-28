import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { AppException } from '../response/app.exception';
import { ErrorResponse } from '../response/app.response';
import { ResponseCode } from '../response/response.code';
import { ResponseStatus } from '../response/response.status';

@Catch()
@Injectable({ scope: Scope.REQUEST })
export class AppExceptionFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status: any, responseStatus: ResponseStatus;
    switch (true) {
      case exception instanceof AppException:
        status = exception.getStatus();
        responseStatus = exception.getResponseStatus;
        this.logger.error(
          `[${AppExceptionFilter.name}] AppException : ${JSON.stringify(
            responseStatus,
          )}`,
        );
        break;
      case exception instanceof Error:
        console.log(exception);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        responseStatus = new ResponseStatus(
          exception.getStatus ? exception.getStatus() : 500,
          exception.getResponse
            ? exception.getResponse().error
            : exception.toString(),
          exception.getResponse
            ? exception.getResponse().message
            : exception.toString(),
        );
        this.logger.error(
          `[${AppExceptionFilter.name}] Error Exception `,
          exception,
        );
        break;
      default:
        status = exception.getStatus();
        responseStatus = ResponseCode.STATUS_9000_BAD_REQUEST;
        this.logger.error(
          `[${AppExceptionFilter.name}] Unknown Exception`,
          exception.stack,
        );
        break;
    }
    response
      .status(status)
      .json(
        new ErrorResponse(
          null,
          responseStatus
            ? responseStatus
            : ResponseCode.STATUS_9000_BAD_REQUEST,
        ),
      );
  }
}
