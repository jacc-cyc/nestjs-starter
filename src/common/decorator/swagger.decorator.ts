import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ErrorResponse } from '../response/app.response';

export function ApiResponseSchema(
  httpStatus: number,
  description: string,
  responseDTO?: any,
  ...extraModels: any[]
) {
  const httpStatusDecorator = [];

  httpStatusDecorator.push(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad Request',
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(ErrorResponse),
          },
        ],
      },
    }),
  );

  return responseDTO
    ? applyDecorators(
        ApiResponse({
          status: httpStatus,
          description: description,
          schema: {
            allOf: [
              {
                $ref: getSchemaPath(responseDTO),
              },
            ],
          },
        }),
        ApiExtraModels(ErrorResponse, responseDTO, ...extraModels),
        ...httpStatusDecorator,
      )
    : applyDecorators(
        ApiResponse({
          status: httpStatus,
          description: description,
        }),
        ApiExtraModels(ErrorResponse),
        ...httpStatusDecorator,
      );
}
