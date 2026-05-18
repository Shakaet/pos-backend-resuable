// middlewares/verifyToken.ts
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import AdminModel from "../app/admin/admin/admin.model";
import { Credentials } from "../config/config";
import ApiError from "../errors/ApiError";
import { logger } from "../shared/logger";

type UserType = "admin" | "merchant";

export const VerifyToken = () => {
  const jwtSecret = Credentials.jwt_token;
  return (
    permissions: string | string[],
    allow: UserType | UserType[],
  ): RequestHandler => {
    return async (req: Request, _res: Response, next: NextFunction) => {
      try {
        const adminToken = req.cookies?.admin_token;

        if (!adminToken) {
          throw new ApiError(401, "Unauthorized");
        }

        const allowedUsers = Array.isArray(allow) ? allow : [allow];

        if (!allowedUsers.length) {
          throw new ApiError(403, "Access Denied");
        }

        const requiredPermissions = Array.isArray(permissions)
          ? permissions
          : [permissions];

        if (!requiredPermissions.length) {
          throw new ApiError(500, "Permissions not defined in middleware");
        }

        let user: any = null;
        let userType: UserType | null = null;

        /**
         * 🔹 ADMIN CHECK
         */
        if (adminToken && allowedUsers.includes("admin")) {
          const decoded: any = jwt.verify(adminToken, jwtSecret);

          user = await AdminModel.findOne({
            admin_phone: decoded.admin_phone,
          }).populate("admin_role_id");

          if (!user || user.admin_status !== "active") {
            throw new ApiError(403, "Invalid Admin");
          }

          userType = "admin";
        }

        if (!user) {
          throw new ApiError(403, "Access Denied");
        }

        /**
         * 🔐 PERMISSION CHECK
         */
        if (userType === "admin") {
          const role = user.admin_role_id;

          if (!role || !Array.isArray(role.permissions)) {
            throw new ApiError(403, "No permissions assigned");
          }

          const hasPermission = requiredPermissions.some((p) =>
            role.permissions.includes(p),
          );

          if (!hasPermission) {
            throw new ApiError(403, "Permission Denied");
          }

          (req as any).user = user;
          (req as any).user_type = userType;

          logger.info(
            `${req.method} ${req.originalUrl}, Admin: ${user?.admin_name}, ${user?.admin_phone}, accessed with permissions: ${requiredPermissions.join(", ")}`,
          );

          return next();
        }

      } catch (error) {
        next(error);
      }
    };
  };
};
