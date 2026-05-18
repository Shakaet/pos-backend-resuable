import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AdminService } from "./admin.service";


export const AdminController = {
  getMe: catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies?.admin_token;
    if (!token) throw new ApiError(401, "Unauthorized");

    const result = await AdminService.getMe(token);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin fetched",
      data: result,
    });
  }),

  create: catchAsync(async (req: Request, res: Response) => {
    await AdminService.create(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Admin created successfully",
    });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const token = await AdminService.login(req.body);

    res.cookie("admin_token", token);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Login successful",
    });
  }),

  logout: catchAsync(async (_req: Request, res: Response) => {
    res.clearCookie("admin_token");

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Logout successful",
    });
  }),

  getPublic: catchAsync(async (req: Request, res: Response) => {

    const result = await AdminService.getPublic(
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins fetched",
      data: result
    });
  }),

  getDashboard: catchAsync(async (req: Request, res: Response) => {
    const { page = 1, limit = 50, searchTerm } = req.query;

    const result = await AdminService.getDashboard(
      Number(page),
      Number(limit),
      searchTerm as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins fetched",
      data: result.data,
      totalData: result.total,
    });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const { _id } = req.body;

    await AdminService.update(_id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin updated",
    });
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    const { _id } = req.body;

    await AdminService.remove(_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted",
    });
  }),
};
