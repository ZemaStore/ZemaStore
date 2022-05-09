export default class ExceptionResponse {
  error: string;

  constructor(error: any) {
    this.error = "";

    if (error) {
      if (error.isCustom === true) {
        this.error = error.message;
      } else {
        this.error = error.stack ? error.stack : error.toString();
      }
    }
  }
}
