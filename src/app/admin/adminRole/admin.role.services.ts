import ApiError from "../../../errors/ApiError";
import { safeDelete } from "../../../helpers/deleteData/safeDelete";
import AdminModel from "../admin/admin.model";
import {
  adminRoleSearchableField,
  IAdminRoleInterface,
} from "./admin.role.interface";
import AdminRoleModel from "./admin.role.model";

export const AdminRoleService = {
  /* ================== CREATE ================== */
  async create(data: IAdminRoleInterface) {
    const exists = await AdminRoleModel.exists({
      admin_role_name: data.admin_role_name,
    });

    if (exists) {
      throw new ApiError(400, "Role already exists");
    }

    return AdminRoleModel.create(data);
  },

  /* ================== GET ALL ================== */
  async getAll() {
    return AdminRoleModel.find({ admin_role_status: "active" }).sort({
      _id: -1,
    });
  },

  /* ================== DASHBOARD ================== */
  async getDashboard(page: number, limit: number, searchTerm?: string) {
    const skip = (page - 1) * limit;
    const andCondition: any[] = [];

    if (searchTerm) {
      andCondition.push({
        $or: adminRoleSearchableField.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      });
    }

    const whereCondition = andCondition.length ? { $and: andCondition } : {};

    const data = await AdminRoleModel.find(whereCondition)
      .populate(["publisher_id", "updated_id"])
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AdminRoleModel.countDocuments(whereCondition);

    return { data, total };
  },

  /* ================== UPDATE ================== */
  async update(id: string, data: IAdminRoleInterface) {
    const role = await AdminRoleModel.findById(id);
    if (!role) throw new ApiError(404, "Role not found");

    const exists = await AdminRoleModel.exists({
      _id: { $ne: id },
      admin_role_name: data.admin_role_name,
    });

    if (exists) {
      throw new ApiError(400, "Role already exists");
    }

    return AdminRoleModel.updateOne({ _id: id }, data, {
      runValidators: true,
    });
  },

  /* ================== DELETE ================== */
  async remove(id: string) {
    return safeDelete(AdminRoleModel, id);
  },
};
