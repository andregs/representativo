
export default class ModelError extends Error {
  statusCode: number;

  constructor(message?: string, code = 400) {
    super(message);
    this.statusCode = code;
  }

}
