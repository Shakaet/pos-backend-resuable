import { Schema, model } from "mongoose";
import { IAdminInterface } from "./admin.interface";

// admin Schema
const adminSchema = new Schema<IAdminInterface>(
  {
    admin_name: {
      type: String,
      required: true,
    },
    admin_phone: {
      type: String,
      required: true,
      unique: true,
    },
    admin_password: {
      type: String,
      required: true,
    },
    admin_status: {
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
    admin_role_id: {
      type: Schema.Types.ObjectId,
      ref: "adminroles",
      required: true,
    },
    publisher_id: {
      type: Schema.Types.ObjectId,
      ref: "admins",
      required: true,
    },
    updated_id: {
      type: Schema.Types.ObjectId,
      ref: "admins",
    },
  },
  {
    timestamps: true,
  },
);

const AdminModel = model<IAdminInterface>("admins", adminSchema);

export default AdminModel;
