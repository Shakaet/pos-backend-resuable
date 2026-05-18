import { Schema, model } from "mongoose";
import { IAdminRoleInterface } from "./admin.role.interface";

const adminRoleSchema = new Schema<IAdminRoleInterface>(
  {
    admin_role_name: {
      type: String,
      required: true,
      unique: true,
    },
    admin_role_status: {
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },

    permissions: {
      type: [String],
      default: [],
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

const AdminRoleModel = model<IAdminRoleInterface>(
  "adminroles",
  adminRoleSchema,
);

export default AdminRoleModel;
