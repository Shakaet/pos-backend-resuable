import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Credentials } from "../../../config/config";
import ApiError from "../../../errors/ApiError";
import { adminSearchableField, IAdminInterface } from "./admin.interface";
import AdminModel from "./admin.model";
import { safeDelete } from "../../../helpers/deleteData/safeDelete";

const jwtSecret: any = Credentials.jwt_token;

export const AdminService = {
  async getMe(token: string) {
    const decoded: any = jwt.verify(token, jwtSecret);

    return AdminModel.findOne({ admin_phone: decoded.admin_phone })
      .populate("admin_role_id")
      .select("-admin_password");
  },

  async create(data: IAdminInterface) {
    const exists = await AdminModel.exists({
      admin_phone: data.admin_phone,
    });

    if (exists) throw new ApiError(400, "Admin already exists");

    data.admin_password = await bcrypt.hash(data.admin_password!, 10);

    return AdminModel.create(data);
  },

  async login(data: any) {
    const admin = await AdminModel.findOne({
      admin_phone: data.admin_phone,
    });

    if (!admin) throw new ApiError(400, "Admin not found");
    if (admin.admin_status === "in-active")
      throw new ApiError(400, "Inactive Admin");

    const match = await bcrypt.compare(
      data.admin_password,
      admin.admin_password!,
    );

    if (!match) throw new ApiError(400, "Password mismatch");

    return jwt.sign({ admin_phone: admin.admin_phone }, jwtSecret, {
      expiresIn: "365d",
    });
  },

  async getPublic() {

    const data = await AdminModel.find({ admin_status: "active" })
      .populate(["admin_role_id", "publisher_id", "updated_id"])
      .select("-admin_password");

    return data;
  },

  async getDashboard(page: number, limit: number, searchTerm?: string) {
    const skip = (page - 1) * limit;

    const andCondition = searchTerm
      ? [
        {
          $or: adminSearchableField.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
          })),
        },
      ]
      : [];

    const whereCondition = andCondition.length ? { $and: andCondition } : {};

    const data = await AdminModel.find(whereCondition)
      .populate(["admin_role_id", "publisher_id", "updated_id"])
      .skip(skip)
      .limit(limit)
      .select("-admin_password");

    const total = await AdminModel.countDocuments(whereCondition);

    return { data, total };
  },

  async update(id: string, data: IAdminInterface) {
    if (data.admin_password) {
      data.admin_password = await bcrypt.hash(data.admin_password, 10);
    }

    return AdminModel.updateOne({ _id: id }, data);
  },

  async remove(id: string) {
    return safeDelete(AdminModel, id);
  },
};
