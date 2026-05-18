import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ApiError from "../errors/ApiError";
import handleCastError from "../errors/handle.cast.error";
import handleValidationError from "../errors/handle.validation.error";
import handleZodError from "../errors/handleZodError";
import { IGenericErrorMessage } from "../interfaces/error.message";
import { errorlogger } from "../shared/logger";

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  errorlogger.error(error);
  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error?.name == "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name == "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.code === 11000) {
    statusCode = 400;
    message = "Duplicate key error";

    errorMessages = Object.keys(error.keyValue || {}).map((key) => ({
      path: key,
      message: `${key} already exists`,
    }));
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
  });
};

export default globalErrorHandler;
