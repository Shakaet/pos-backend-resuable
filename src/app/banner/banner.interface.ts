// banner.interface.ts
import { Document } from "mongoose";

export type BannerStatus = "active" | "inactive";

export interface IBanner extends Document {
  banner_image: string;
  banner_image_key: string;
  status: BannerStatus;
}