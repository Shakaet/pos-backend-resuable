import express from "express";
import { FileUploadHelper } from "../../../helpers/image.upload";
import { VerifyToken } from "../../../middlewares/verify.token";
import { SettingController } from "./setting.controller";

const router = express.Router();
const verify = VerifyToken();

router
  .route("/")
  .get(SettingController.getSetting)

// Banner self dashboard
router
  .route("/admin")
  .get(verify("admin_setting_show", "admin"), SettingController.getSetting)
  .post(
    verify("admin_setting_create_update", "admin"),
    FileUploadHelper.ImageUpload.any(),
    SettingController.upsertSetting,
  );

export const SettingRoutes = router;
