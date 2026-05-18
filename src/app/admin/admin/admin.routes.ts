import express from "express";

import ValidateRequest from "../../../middlewares/validateRequest";
import { VerifyToken } from "../../../middlewares/verify.token";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

const verify = VerifyToken();

const Validation = AdminValidation;

router.get("/", AdminController.getMe);

// Public get route
router.get("/public", AdminController.getPublic);

router.post("/login", AdminController.login);

router.get("/logout", AdminController.logout);

// Dashboard routes
router
  .route("/admin")
  .get(verify("admin_show", "admin"), AdminController.getDashboard)
  .post(
    verify("admin_create", "admin"),
    ValidateRequest(Validation.create),
    AdminController.create,
  )
  .patch(
    verify("admin_update", "admin"),
    ValidateRequest(Validation.update),
    AdminController.update,
  )
  .delete(
    verify("admin_delete", "admin"),
    ValidateRequest(Validation.delete),
    AdminController.remove,
  );

export const AdminRoutes = router;
