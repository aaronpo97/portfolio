export default class ServerError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public error: Error,
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}
