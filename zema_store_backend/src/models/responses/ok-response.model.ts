export default class OkResponse<T> {
  data: T;
  message: string;

  constructor(data, message = null) {
    this.data = data;
    this.message = message;
  }
}
