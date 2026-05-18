import { z } from "zod";

export const AdminRoleValidation = {
  create: z.object({
    body: z.object({
      admin_role_name: z.string({
        message: "Role name is required",
      }),
      permissions: z.array(z.string()).optional(),
      admin_role_status: z.enum(["active", "in-active"], {
        message: "Admin Role Status is required",
      }),
    }),
  }),

  update: z.object({
    body: z.object({
      _id: z.string({
        message: "_id is required",
      }),
      admin_role_name: z.string().optional(),
      permissions: z.array(z.string()).optional(),
    }),
  }),

  delete: z.object({
    body: z.object({
      _id: z.string({
        message: "_id is required",
      }),
    }),
  }),
};
