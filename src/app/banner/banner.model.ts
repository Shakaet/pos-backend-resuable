// banner.model.ts
import { Schema, model } from "mongoose";
import { IBanner } from "./banner.interface";

const BannerSchema = new Schema<IBanner>(
  {
    banner_image: { type: String, required: true },
    banner_image_key: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

export const Banner = model<IBanner>("Banner", BannerSchema);
