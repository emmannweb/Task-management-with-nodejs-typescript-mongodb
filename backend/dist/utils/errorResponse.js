"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse extends Error {
    constructor(message, codeStatus) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.codeStatus = codeStatus;
        Error.captureStackTrace(this);
    }
}
exports.ErrorResponse = ErrorResponse;
