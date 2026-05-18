import { Schema, model } from "mongoose";
import { ISettingInterface } from "./setting.interface";

// setting Schema
const settingSchema = new Schema<ISettingInterface>(
  {
    logo: {
      type: String,
    },
    pay_with: {
      type: String,
    },
    favicon: {
      type: String,
    },
    title: {
      type: String,
    },
    contact: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    you_tube: {
      type: String,
    },
    watsapp: {
      type: String,
    },
    tik_tok: {
      type: String,
    },
    about_us: {
      type: String,
    },
    refund_policy: {
      type: String,
    },
    cancellation_policy: {
      type: String,
    },
    privacy_policy: {
      type: String,
    },
    terms_condition: {
      type: String,
    },
    card_one_logo: {
      type: String,
    },
    card_one_title: {
      type: String,
    },
    card_two_logo: {
      type: String,
    },
    card_two_title: {
      type: String,
    },
    card_three_logo: {
      type: String,
    },
    card_three_title: {
      type: String,
    },
    card_four_logo: {
      type: String,
    },
    card_four_title: {
      type: String,
    },
    card_five_logo: {
      type: String,
    },
    card_five_title: {
      type: String,
    },

    // banner cart and path
    card_one_banner: {
      type: String,
    },
    card_one_path: {
      type: String,
    },
    card_two_banner: {
      type: String,
    },
    card_two_path: {
      type: String,
    },
    card_three_banner: {
      type: String,
    },
    card_three_path: {
      type: String,
    },
    laundry_service_image: {
      type: String,
    },
    laundry_service_note: {
      type: String
    },

    inside_dhaka_delivery_charge: {
      type: Number,
    },
    inside_dhaka_delivery_days: {
      type: String,
    },
    outside_dhaka_delivery_charge: {
      type: Number,
    },
    outside_dhaka_delivery_days: {
      type: String,
    },
    is_shipping_charge_off: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const SettingModel = model<ISettingInterface>("settings", settingSchema);

export default SettingModel;
