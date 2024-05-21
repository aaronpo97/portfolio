import ServerError from '@/ServerError';
import ErrorResponse from '../response-types/ErrorResponse';

export default class ErrorResponseBuilder {
  private message: string;

  private statusCode: number;

  private error: Error;

  constructor() {
    this.message = 'Something went wrong.';
    this.statusCode = 500;
    this.error = new Error(this.message);
  }

  setError(error: ServerError) {
    this.statusCode = error.status;
    this.message = error.message;
    this.error = error;
    return this;
  }

  create() {
    return new ErrorResponse(this.message, this.statusCode, this.error);
  }
}
