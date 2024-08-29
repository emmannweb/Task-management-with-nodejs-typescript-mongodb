class ErrorResponse extends Error {
  public readonly codeStatus: number;

  constructor(message: string, codeStatus: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.codeStatus = codeStatus;
    Error.captureStackTrace(this);
  }
}

module.exports = ErrorResponse;
