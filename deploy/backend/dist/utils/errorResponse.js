"use strict";
class ErrorResponse extends Error {
    constructor(message, codeStatus) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.codeStatus = codeStatus;
        Error.captureStackTrace(this);
    }
}
module.exports = ErrorResponse;
