import { ZodError, ZodIssue } from "zod";
import { IGenericErrorMessage } from "../interfaces/error.message";
import { IGenericErrorResponse } from "../interfaces/error.response";

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = err.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages,
  };
};

export default handleZodError;
