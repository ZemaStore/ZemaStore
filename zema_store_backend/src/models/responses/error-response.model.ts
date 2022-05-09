export default class ErrorResponse {
  error: string;
  data: any;

  constructor(error, data = null) {
    this.error = error;
    this.data = data;
  }
}
