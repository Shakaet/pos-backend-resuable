// middlewares/customCors.ts
import { NextFunction, Request, Response } from "express";

const allowedPrivateDomains = ["http://localhost:3000", "http://localhost:3001"];

const customCors = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void | any => {
  const origin = req.headers.origin;

  if (req.originalUrl.startsWith("/api/v1")) {
    res.header("Access-Control-Allow-Origin", origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    return next();
  }

  if (origin && allowedPrivateDomains.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "CORS policy does not allow access from this origin.",
  });
};

export default customCors;
