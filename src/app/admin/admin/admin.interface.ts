import { Types } from "mongoose";
import { IAdminRoleInterface } from "../adminRole/admin.role.interface";

export interface IAdminInterface {
  _id?: any;
  admin_name: string;
  admin_phone: string;
  admin_password: string;
  admin_status: "active" | "in-active";
  admin_role_id: Types.ObjectId | IAdminRoleInterface;
  publisher_id: Types.ObjectId | IAdminInterface;
  updated_id?: Types.ObjectId | IAdminInterface;
}

export const adminSearchableField = [
  "admin_name",
  "admin_phone",
  "admin_status",
];
