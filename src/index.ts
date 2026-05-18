import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import httpStatus from "http-status";
import customCors from "./middlewares/customCors";
import globalErrorHandler from "./middlewares/global.error.handler";
import routes from "./routes/routes";
import connectDB from "./server";
import { errorlogger } from "./shared/logger";
const cookieParser = require("cookie-parser");
import 'dotenv/config';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom CORS middleware
app.use(customCors);
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // max 60 requests per minute per IP
  message: {
    success: false,
    message: "Too many requests. Please try again after 1 minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/", async (req: Request, res: Response) => {
  res.send("Project is working! YaY!");
});

// Import All Api
app.use("/api/v1", apiLimiter, routes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  errorlogger.error(`404 Not Found: ${req.originalUrl}`);
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

//connect to db
connectDB();

// Run every 5 second
// setInterval(() => {
// console.log('Running cron job every 5 minutes...');
  // removeProductOfferIdOfferEnd();
//   console.log('Successfully ran cron job.');
// }, 5000);

const port: number | any = process.env.PORT || 5000;
const nowDateTime: any = new Date();
const time = nowDateTime.toLocaleTimeString();
const date = nowDateTime.toLocaleString("en-us", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});

// "192.168.7.210",
// app.listen(port, "192.168.7.210", () => {
app.listen(port, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "[FC]",
    time,
    ":",
    date,
    `: Project listening on port ${port}`
  );
});
