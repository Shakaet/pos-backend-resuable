import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const ValidateRequest =
  (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      next(err);
    }
  };

export default ValidateRequest;
