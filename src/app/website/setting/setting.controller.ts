import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SettingService } from "./setting.service";

export const SettingController = {
  // Create and update Setting
  upsertSetting: catchAsync(async (req: Request, res: Response) => {
    const result = await SettingService.upsertSetting(
      req.body,
      req.files as any[],
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Setting created successfully",
    });
  }),

  // Get Expense dashboard
  getSetting: catchAsync(async (req: Request, res: Response) => {
    const data = await SettingService.getSetting();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Setting fetched successfully",
      data: data,
    });
  }),
};
