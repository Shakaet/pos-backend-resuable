import AdminModel from "../../app/admin/admin/admin.model";
import AdminRoleModel from "../../app/admin/adminRole/admin.role.model";
// import BannerModel from "../../app/website/banner/banner.model";
// import CategoryModel from "../../app/website/category/category.model";
// import ProductModel from "../../app/website/product/product/product.model";
// import AttributeModel from "../../app/website/attribute/attribute.model";
// import OfferModel from "../../app/website/offer/offer.model";
// import CouponModel from "../../app/website/coupon/coupon.model";
// import CustomOrderModel from "../../app/website/order/customOrder/custom.order.service.model";
// import MedicineOrderModel from "../../app/website/order/customMedicineOrder/medicine.order.model";
// import LaundryServiceModel from "../../app/website/order/laundryService/laundry.service.model";
// import CustomerModel from "../../app/customer/customer/customer.model";
// import MerchantModel from "../../app/merchant/merchant/merchant.model";
// import SupplierModel from "../../app/software/supplier/supplier.model";
// import PaymentMethodModel from "../../app/software/payment_method/payment.method.model";
// import PurchaseModel from "../../app/software/purchase/purchase/purchase.model";
// import PosOrderModel from "../../app/software/pos/posOrder/pos.order.model";
// import MerchantWithdrowDepositeModel from "../../app/merchant/merchant_withdrow_deposite/merchant_withdrow_deposite.model";
// import { ExpenseIncomeModel } from "../../app/common/expenseIncome/expenseIncome.model";
// import { NotificationModel } from "../../app/common/Notification/notification.model";
// import { OrderModel } from "../../app/website/order/order/order.model";
// import { ReturnOrderModel } from "../../app/website/order/returnOrder/return.order.model";
// import { RefundModel } from "../../app/website/refund/refund.model";
// import { FullOrderModel } from "../../app/website/order/order/fullOrder/full.order.model";
// import { PurchaseReturnModel } from "../../app/software/purchase/purchase_return/purchase.return.model";

export const deleteReferenceMap: Record<
  string,
  {
    model: any;
    foreignKey: string;
  }[]
> = {
  admins: [
    // Admin Role references
    { model: AdminRoleModel, foreignKey: "publisher_id" },
    { model: AdminRoleModel, foreignKey: "updated_id" },
    
    // Admin self-references
    { model: AdminModel, foreignKey: "publisher_id" },
    { model: AdminModel, foreignKey: "updated_id" },
    
    // // Website/Banner references
    // { model: BannerModel, foreignKey: "publisher_id" },
    // { model: BannerModel, foreignKey: "updated_id" },
    
    // // Category references
    // { model: CategoryModel, foreignKey: "publisher_id" },
    // { model: CategoryModel, foreignKey: "updated_id" },
    
    // // Attribute references
    // { model: AttributeModel, foreignKey: "publisher_id" },
    // { model: AttributeModel, foreignKey: "updated_id" },
    
    // // Product references
    // { model: ProductModel, foreignKey: "publisher_id" },
    // { model: ProductModel, foreignKey: "updated_id" },
    
    // // Coupon references
    // { model: CouponModel, foreignKey: "coupon_publisher_id" },
    // { model: CouponModel, foreignKey: "coupon_updated_by" },
    
    // // Supplier references
    // { model: SupplierModel, foreignKey: "publisher_id" },
    // { model: SupplierModel, foreignKey: "updated_id" },
    
    // // Payment Method references
    // { model: PaymentMethodModel, foreignKey: "publisher_id" },
    // { model: PaymentMethodModel, foreignKey: "updated_id" },
    
    // // Purchase references
    // { model: PurchaseModel, foreignKey: "publisher_id" },
    // { model: PurchaseModel, foreignKey: "updated_id" },
    
    // // Notification references
    // { model: NotificationModel, foreignKey: "admin_id" },
  ],
  
  adminroles: [
    { model: AdminModel, foreignKey: "admin_role_id" },
  ],
  
  // categories: [
  //   { model: ProductModel, foreignKey: "category_id" },
  // ],
  
  // products: [
  //   { model: OfferModel, foreignKey: "offer_owner_id" },
  //   { model: CouponModel, foreignKey: "coupon_specific_product.product_id" },
  //   { model: PurchaseModel, foreignKey: "product_id" },
  // ],
  
  // merchants: [
  //   { model: ProductModel, foreignKey: "product_owner" },
  //   { model: OfferModel, foreignKey: "offer_owner_id" },
  //   { model: CouponModel, foreignKey: "coupon_merchant_id" },
  //   { model: OrderModel, foreignKey: "merchant_id" },
  //   { model: MerchantWithdrowDepositeModel, foreignKey: "merchant_id" },
  // ],
  
  // customers: [
  //   { model: OrderModel, foreignKey: "customer_id" },
  //   { model: ReturnOrderModel, foreignKey: "customer_id" },
  //   { model: RefundModel, foreignKey: "customer_id" },
  //   { model: CustomOrderModel, foreignKey: "custom_order_customer_id" },
  //   { model: MedicineOrderModel, foreignKey: "medicine_order_customer_id" },
  //   { model: LaundryServiceModel, foreignKey: "laundry_service_customer_id" },
  //   { model: FullOrderModel, foreignKey: "customer_id" },
  //   { model: NotificationModel, foreignKey: "customer_id" },
  // ],
  
  // orders: [
  //   { model: ReturnOrderModel, foreignKey: "order_id" },
  //   { model: RefundModel, foreignKey: "order_id" },
  // ],
  
  // suppliers: [
  //   { model: PurchaseModel, foreignKey: "supplier_id" },
  //   { model: PurchaseReturnModel, foreignKey: "supplier_id" },
  // ],
  
  // paymentmethods: [
  //   { model: ReturnOrderModel, foreignKey: "payment_method_id" },
  //   { model: RefundModel, foreignKey: "payment_method_id" },
  //   { model: PurchaseReturnModel, foreignKey: "payment_method_id" },
  //   { model: MerchantWithdrowDepositeModel, foreignKey: "payment_method_id" },
  // ],
  
  // expensecategories: [
  //   { model: ExpenseIncomeModel, foreignKey: "expense_category_id" },
  // ],
  
  banners: [],
  attributes: [],
  notifications: [],
  settings: [],
  coupons: [],
  offers: [],
  returnorders: [],
  refunds: [],
  customorders: [],
  medicineorders: [],
  laundryservices: [],
  fullorders: [],
  purchases: [],
  purchasereturns: [],
  posorders: [],
  merchants_withdrow_deposites: [],
};
