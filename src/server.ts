import dotenv from "dotenv";
import { errorlogger, logger } from "./shared/logger";

dotenv.config();

const mongoose = require("mongoose");

// const uri = `mongodb://remotdb_aladinuser:DP6Pxn82B8@153.92.4.52:27017/remotdb_aladindb?replicaSet=rs0&authSource=admin`;
const uri = `mongodb://remotdb_aladindevuser:DFLPxn82B8@153.92.4.52:27017/remotdb_aladindevdb?replicaSet=rs0&authSource=admin`;

process.on("unhandledRejection", (reason: any) => {
  errorlogger.error(
    reason instanceof Error ? reason.stack || reason.message : String(reason),
  );
  process.exit(1);
});

process.on("uncaughtException", (error: Error) => {
  errorlogger.error(error.stack || error.message);
  process.exit(1);
});

const port: any = process.env.PORT || 5000;

function connectDB() {
  mongoose.set("strictQuery", false);
  const nowDateTime: any = new Date();
  const time = nowDateTime.toLocaleTimeString();
  const date = nowDateTime.toLocaleString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  mongoose
    .connect(uri)
    .then(() => {
      console.log(
        "\x1b[36m%s\x1b[0m",
        "[FC]",
        time,
        ":",
        date,
        ": Database is connected Successfully",
      );
      logger.info(`app is listening on port ${port} at ${date} , ${time}`);
    })
    .catch((err: Error) => {
      console.error(`Error connecting to MongoDB: ${err.message}`);
      errorlogger.error(err);
    });
}

export default connectDB;
