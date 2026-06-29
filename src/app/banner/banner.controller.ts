// banner.controller.ts
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BannerService } from "./banner.service";



export const BannerController = {
 createBanner : catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.createBanner(req.file!);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Banner created successfully",
    data: result,
  });
}),

getAllBanners : catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.getAllBanners();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banners fetched successfully",
    data: result,
  });
}),
 getSingleBanner : catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.getSingleBanner(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner fetched successfully",
    data: result,
  });
}),

updateBanner : catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.updateBanner(
    req.params.id as string,
    req.file,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner updated successfully",
    data: result,
  });
}),

deleteBanner : catchAsync(async (req: Request, res: Response) => {
  await BannerService.deleteBanner(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner deleted successfully",
    data: null,
  });
}),

 toggleStatus : catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.toggleStatus(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner status updated",
    data: result,
  });
})
};