import ServerResponse from '../ServerResponse';

export default class SuccessResponse extends ServerResponse {
  constructor(
    public message: string,
    public statusCode: number,
    public payload?: { [key: string]: unknown },
  ) {
    const success = true;
    super(message, statusCode, success);
    this.payload = payload;
  }
}
