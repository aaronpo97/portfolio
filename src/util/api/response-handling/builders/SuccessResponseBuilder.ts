import SuccessResponse from '../response-types/SuccessResponse';

export default class SuccessResponseBuilder {
  private message: string;

  private statusCode: number;

  private payload: { [key: string]: unknown } | undefined;

  constructor() {
    this.message = '';
    this.statusCode = 200;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setStatusCode(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  setPayload(payload: { [key: string]: unknown }) {
    this.payload = payload;
    return this;
  }

  create() {
    return new SuccessResponse(this.message, this.statusCode, this.payload);
  }
}
