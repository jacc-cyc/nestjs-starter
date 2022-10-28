export class ResponseStatus {
  private readonly code: number;
  private readonly error: string;
  private readonly message?: string | string[];
  constructor(_code: number, _error: string, _message?: string | string[]) {
    this.code = _code;
    this.error = _error;
    this.message = _message;
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
}
