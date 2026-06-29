// banner.service.ts
import ApiError from "../../errors/ApiError";
import { FileUploadHelper } from "../../helpers/image.upload";
import { IBanner } from "./banner.interface";
import { Banner } from "./banner.model";



export const BannerService = {

  createBanner : async (file: any): Promise<IBanner> => {
  if (!file) throw new ApiError(400, "Banner image is required");

  const uploaded = await FileUploadHelper.uploadToSpaces(file);

  const banner = await Banner.create({
    banner_image: uploaded.Location,
    banner_image_key: uploaded.Key,
    status: "active",
  });

  return banner;
},

getAllBanners : async (): Promise<IBanner[]> => {
  return await Banner.find().sort({ createdAt: -1 });
},

getSingleBanner : async (id: string): Promise<IBanner> => {
  const banner = await Banner.findById(id);
  if (!banner) throw new ApiError(404, "Banner not found");
  return banner;
},

updateBanner : async (
  id: string,
  file?: Express.Multer.File,
  payload?: Partial<IBanner>
): Promise<IBanner> => {
  const existing = await Banner.findById(id);
  if (!existing) throw new ApiError(404, "Banner not found");

  let updateData: Partial<IBanner> = { ...payload };

  if (file) {
    // delete old image
    await FileUploadHelper.deleteFromSpaces(existing.banner_image_key);

    // upload new image
    const uploaded = await FileUploadHelper.uploadToSpaces(file);
    updateData.banner_image = uploaded.Location;
    updateData.banner_image_key = uploaded.Key;
  }

  const updated = await Banner.findByIdAndUpdate(id, updateData, { new: true });
  return updated!;
},

deleteBanner : async (id: string): Promise<void> => {
  const existing = await Banner.findById(id);
  if (!existing) throw new ApiError(404, "Banner not found");

  await FileUploadHelper.deleteFromSpaces(existing.banner_image_key);
  await Banner.findByIdAndDelete(id);
},

 toggleStatus : async (id: string): Promise<IBanner> => {
  const existing = await Banner.findById(id);
  if (!existing) throw new ApiError(404, "Banner not found");

  const updated = await Banner.findByIdAndUpdate(
    id,
    { status: existing.status === "active" ? "inactive" : "active" },
    { new: true }
  );
  return updated!;
},

};