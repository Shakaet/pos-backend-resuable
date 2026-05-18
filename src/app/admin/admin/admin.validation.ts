import { z } from "zod";

export const AdminValidation = {
  create: z.object({
    body: z.object({
      admin_name: z.string({
        message: "Admin Name is required",
      }),

      admin_phone: z.string({
        message: "Admin Phone is required",
      }),

      admin_password: z.string({
        message: "Admin Password is required",
      }),

      admin_role_id: z.string({
        message: "Admin Role ID is required",
      }),
    }),
  }),

  update: z.object({
    body: z.object({
      _id: z.string({
        message: "_id is required",
      }),
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
