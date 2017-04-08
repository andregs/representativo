
export class ModelError extends Error {
  statusCode: number;
  name = 'ModelError';

  constructor(message = 'Bad Request', code = 400) {
    super(message);
    this.statusCode = code;
  }

}
