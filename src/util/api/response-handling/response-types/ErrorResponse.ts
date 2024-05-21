import ServerResponse from '../ServerResponse';

export default class ErrorResponse extends ServerResponse {
  constructor(
    public message: string,
    public statusCode: number,
    public error: Error,
  ) {
    const success = false;
    super(message, statusCode, success);
    this.error = error;
  }
}
