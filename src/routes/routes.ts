import express from "express";
import { AdminRoutes } from "../app/admin/admin/admin.routes";
import { AdminRoleRoutes } from "../app/admin/adminRole/admin.role.routes";
import { BannerRoutes } from "../app/banner/banner.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/admin_role",
    route: AdminRoleRoutes,
  },
  // {
  //   path: "/banner",
  //   route: BannerRoutes,
  // },
  // {
  //   path: "/category",
  //   route: CategoryRoutes,
  // },
  // {
  //   path: "/attribute",
  //   route: AttributeRoutes,
  // },
  // {
  //   path: "/product",
  //   route: ProductRoutes,
  // },
  // {
  //   path: "/purchase",
  //   route: PurchaseRoutes,
  // },
  // {
  //   path: "/payment_method",
  //   route: PaymentMethodRoutes,
  // },
  // {
  //   path: "/expense_category",
  //   route: ExpenseCategoryRoutes,
  // },
  // {
  //   path: "/expense",
  //   route: ExpenseRoutes,
  // },
  // {
  //   path: "/offer",
  //   route: OfferRoutes,
  // },
  // {
  //   path: "/customer",
  //   route: CustomerRoutes,
  // },
  // {
  //   path: "/customer_payment",
  //   route: CustomerPaymentRoutes,
  // },
  // {
  //   path: "/laundry_service",
  //   route: LaundryServiceRoutes,
  // },
  // {
  //   path: "/custom_order",
  //   route: CustomOrderRoutes,
  // },
  // {
  //   path: "/custom_medicine_order",
  //   route: CustomMedicineOrderRoutes,
  // },
  // {
  //   path: "/order",
  //   route: OrderRoutes,
  // },
  // {
  //   path: "/merchant",
  //   route: MerchantRoutes,
  // },
  // {
  //   path: "/merchant_withdraw_deposite",
  //   route: MerchantWithdrowDepositeRoutes,
  // },
  // {
  //   path: "/pos_order",
  //   route: PosOrderRoutes,
  // },
  // {
  //   path: "/pos_return",
  //   route: PosReturnRoutes,
  // },
  // {
  //   path: "/purchase_return",
  //   route: PurchaseReturnRoutes,
  // },
  // {
  //   path: "/supplier",
  //   route: SupplierRoutes,
  // },
  // {
  //   path: "/supplier_payment",
  //   route: SupplierPaymentRoutes,
  // },
  // {
  //   path: "/setting",
  //   route: SettingRoutes,
  // },
  {
    path: "/banner",
    route: BannerRoutes,
  }
  // {
  //   path: "/coupon",
  //   route: CouponRoutes,
  // },
  // {
  //   path: "/rider",
  //   route: RiderRoutes,
  // },
  // {
  //   path: "/refund",
  //   route: RefundRoutes
  // },
  // {
  //   path: "/rider_api",
  //   route: RiderApiRoutes,
  // },
  // {
  //   path: "/rider_withdraw",
  //   route: RiderWithdrowPaymentRoutes,
  // },
  // {
  //   path: "/dashboard",
  //   route: DashboardRoutes,
  // },
  //  {
  //   path: "/return-order",
  //   route: ReturnOrderRoutes,
  // },
  // {
  //   path: "/notification",
  //   route: NotificationRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
