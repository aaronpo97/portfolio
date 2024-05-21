export default abstract class ServerResponse {
  constructor(
    public message: string,
    public statusCode: number,
    public success: boolean,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.success = success;
  }
}
