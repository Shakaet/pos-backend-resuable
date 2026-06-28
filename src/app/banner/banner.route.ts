// banner.route.ts
import express from "express";
import { BannerController } from "./banner.controller";
import { FileUploadHelper } from "../../helpers/image.upload";

const router = express.Router();

router.post(
  "/",
  FileUploadHelper.ImageUpload.single("banner_image"),
  BannerController.createBanner
);

router.get("/", BannerController.getAllBanners);

router.get("/:id", BannerController.getSingleBanner);

router.patch(
  "/:id",
  FileUploadHelper.ImageUpload.single("banner_image"),
  BannerController.updateBanner
);

router.patch("/:id/toggle-status", BannerController.toggleStatus);

router.delete("/:id", BannerController.deleteBanner);

export const BannerRoutes = router;