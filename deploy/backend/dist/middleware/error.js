"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorResponse_1 = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    if (err.name === "CastError") {
        const message = `Ressource not found ${err.value}`;
        error = new errorResponse_1.ErrorResponse(message, 404);
    }
    //Mongoose duplicate value
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new errorResponse_1.ErrorResponse(message, 400);
    }
    //Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => " " + val.message);
        error = new errorResponse_1.ErrorResponse(message.join(","), 400);
    }
    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || "server error",
    });
};
exports.errorHandler = errorHandler;
