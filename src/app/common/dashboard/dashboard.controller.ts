// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";
// import moment from "moment";
// import mongoose, { Types } from "mongoose";
// import catchAsync from "../../../shared/catchAsync";
// import sendResponse from "../../../shared/sendResponse";
// import MerchantModel from "../../merchant/merchant/merchant.model";
// import { DashboardService } from "./dashboard.service";
// import ApiError from "../../../errors/ApiError";

// export const DashboardController = {
//   /* ================== customer ================== */
//   customer: catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         return sendResponse(res, {
//           statusCode: httpStatus.OK,
//           success: true,
//           message: "Dashboard Data successfully !",
//         });
//       } catch (error) {
//         next(error);
//       }
//     },
//   ),

//   /* ================== merchant ================== */
//   merchant: catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         const result = await DashboardService.merchant(req.query);

//         return sendResponse(res, {
//           statusCode: httpStatus.OK,
//           success: true,
//           message: "Dashboard Data successfully !",
//           data: result
//         });
//       } catch (error) {
//         next(error);
//       }
//     },
//   ),

//   /* ================== admin ================== */
//   admin: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const result = await DashboardService.admin(req.query);

//       return sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Dashboard Data successfully !",
//         data: result,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }),

//   getDashboardAdmin: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   try {  
//     const result = await DashboardService.getAdminDashboardData(req.query);
//     return sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Dashboard data fetched successfully!",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// }),

// getDashboardMerchant: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const merchant = (req as any).user;
//     if(!merchant){
//       throw new Error("Merchant ID is Required !")
//     }
//     const result = await DashboardService.getMerchantDashboardData(req.query, merchant?._id);
//     return sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Merchant dashboard data fetched successfully!",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// }),
// };
