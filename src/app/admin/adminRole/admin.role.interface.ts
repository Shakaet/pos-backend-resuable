import { Types } from "mongoose";
import { IAdminInterface } from "../admin/admin.interface";

export interface IAdminRoleInterface {
  _id?: string;
  admin_role_name: string;
  permissions: string[];
  admin_role_status: "active" | "in-active";
  publisher_id: Types.ObjectId | IAdminInterface;
  updated_id?: Types.ObjectId | IAdminInterface;
}

export const adminRoleSearchableField = ["admin_role_name"];
