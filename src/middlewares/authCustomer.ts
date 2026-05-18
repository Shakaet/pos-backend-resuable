import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Credentials } from "../config/config";
import ApiError from "../errors/ApiError";

export const AuthCustomer = () => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization?.split(" ")[1];
      if (
        !token ||
        token == null ||
        token == "null" ||
        token == undefined ||
        token == "undefined"
      ) {
        throw new ApiError(401, "Need Token");
      }

      const decoded: any = jwt.verify(token, Credentials.jwt_access_secret);
      req.customer = decoded;

      next();
    } catch (err) {
      next(new ApiError(401, "Unauthorized"));
    }
  };
};
