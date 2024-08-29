let errorResponse = require("../utils/errorResponse");

import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Ressource not found ${err.value}`;
    error = new errorResponse(message, 404);
  }

  //Mongoose duplicate value
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new errorResponse(message, 400);
  }

  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (val: any) => " " + val.message
    );
    error = new errorResponse(message, 400);
  }

  res.status(error.codeStatus || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
