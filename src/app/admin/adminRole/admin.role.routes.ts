import express from "express";

import ValidateRequest from "../../../middlewares/validateRequest";
import { VerifyToken } from "../../../middlewares/verify.token";
import { AdminRoleController } from "./admin.role.controllers";
import { AdminRoleValidation } from "./admin.role.validation";

const router = express.Router();

const verify = VerifyToken();

const Validation = AdminRoleValidation;

// Public route
router.get("/", AdminRoleController.getAll);

// Dashboard routes
router
  .route("/admin")
  .get(verify("admin_role_show", "admin"), AdminRoleController.getDashboard)
  .post(
    verify("admin_role_create", "admin"),
    ValidateRequest(Validation.create),
    AdminRoleController.create,
  )
  .patch(
    verify("admin_role_update", "admin"),
    ValidateRequest(Validation.update),
    AdminRoleController.update,
  )
  .delete(
    verify("admin_role_delete", "admin"),
    ValidateRequest(Validation.delete),
    AdminRoleController.remove,
  );

export const AdminRoleRoutes = router;
