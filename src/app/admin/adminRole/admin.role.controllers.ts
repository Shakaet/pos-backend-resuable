import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AdminRoleService } from "./admin.role.services";

export const AdminRoleController = {
  /* ================== CREATE ================== */
  create: catchAsync(async (req: Request, res: Response) => {
    const result = await AdminRoleService.create(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Role created successfully",
    });
  }),

  /* ================== GET ALL ================== */
  getAll: catchAsync(async (_req: Request, res: Response) => {
    const result = await AdminRoleService.getAll();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }),

  /* ================== DASHBOARD ================== */
  getDashboard: catchAsync(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, searchTerm } = req.query;

    const result = await AdminRoleService.getDashboard(
      Number(page),
      Number(limit),
      searchTerm as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result.data,
      totalData: result.total,
    });
  }),

  /* ================== UPDATE ================== */
  update: catchAsync(async (req: Request, res: Response) => {
    const { _id } = req.body;

    const result = await AdminRoleService.update(_id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Role updated successfully",
    });
  }),

  /* ================== DELETE ================== */
  remove: catchAsync(async (req: Request, res: Response) => {
    const { _id } = req.body;

    await AdminRoleService.remove(_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Role deleted successfully",
    });
  }),
};
