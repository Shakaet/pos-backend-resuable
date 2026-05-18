import { Response } from "express";

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
  totalData?: number | null;
};

const sendResponse = <T>(res: Response, payload: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: payload.statusCode,
    success: payload.success,
    message: payload.message ?? null,
    // data: payload.data ?? null,
    // totalData: payload.totalData ?? null,
  };
  // if data
  if (payload.data !== undefined) {
    responseData.data = payload.data;
  }

  // if totalData
  if (payload.totalData !== undefined) {
    responseData.totalData = payload.totalData;
  }

  res.status(payload.statusCode).json(responseData);
};

export default sendResponse;
