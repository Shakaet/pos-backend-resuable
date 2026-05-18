import mongoose from "mongoose";
import { FileUploadHelper } from "../../../helpers/image.upload";
import SettingModel from "./setting.model";

/* ---------------- HELPERS ---------------- */
const getImageFile = (files: any[], name: string) =>
  files?.find((f) => f.fieldname === name);

const imageFields = [
  "logo",
  "favicon",
  "card_one_logo",
  "card_two_logo",
  "card_three_logo",
  "card_four_logo",
  "pay_with",
  "card_five_logo",
  "card_one_banner",
  "card_two_banner",
  "card_three_banner",
  "laundry_service_image"
];

/* parse payload & handle image uploads */
const parsePayload = async (payload: any, files: any[]) => {
  const parsedPayload = { ...payload };

  // loop through image fields
  for (const field of imageFields) {
    const file = getImageFile(files, field);
    if (file) {
      const upload = await FileUploadHelper.uploadToSpaces(file);
      parsedPayload[field] = upload.Location;
      parsedPayload[`${field}_key`] = upload.Key;
    }
  }

  // parse numbers if any
  if (parsedPayload.charge_per_seat)
    parsedPayload.charge_per_seat = Number(parsedPayload.charge_per_seat);
  if (parsedPayload.usd_rate)
    parsedPayload.usd_rate = Number(parsedPayload.usd_rate);

  return parsedPayload;
};

/* ---------------- SERVICES ---------------- */
export const SettingService = {
  // Get the single setting document
  async getSetting() {
    const setting = await SettingModel.findOne();
    return setting;
  },

  // Insert or update (singleton)
  async upsertSetting(payload: any, files: any[]) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const parsedPayload = await parsePayload(payload, files);

      // check if setting exists
      const existing = await SettingModel.findOne();

      let result;
      if (existing) {
        // update existing
        result = await SettingModel.findByIdAndUpdate(
          existing._id,
          { $set: parsedPayload },
          { new: true, session },
        );
      } else {
        // create new
        result = await SettingModel.create([parsedPayload], { session });
        result = result[0];
      }

      await session.commitTransaction();
      session.endSession();
      return result;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
};
