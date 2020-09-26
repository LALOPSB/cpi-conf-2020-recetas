export class NotFoundError extends Error {
  constructor(args) {
    super(args);
    this.message = 'Not found!';
    this.statusCode = 404;
  }
}

export class BadRequestError extends Error {
  constructor(args) {
    super(args);
    this.message = 'Bad request!';
    this.statusCode = 400;
  }
}

export class ExistentRecordError extends Error {
  constructor(args) {
    super(args);
    this.message = 'the record already exists!';
    this.statusCode = 422;
  }
}

export class UnprocessableEntityError extends Error {
  constructor(args) {
    super(args);
    this.message = 'Unprocessable entity!';
    this.statusCode = 422;
  }
}
