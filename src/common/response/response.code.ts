import { ResponseStatus } from './response.status';

export class ResponseCode {
  static readonly STATUS_9000_BAD_REQUEST = new ResponseStatus(
    9000,
    'Bad Request',
    'Message',
  );
}
