// import httpStatus from "http-status";
// import mongoose, { Types } from "mongoose";
// import ApiError from "../../../errors/ApiError";
// import { OrderModel } from "../../website/order/order/order.model";
// import ProductModel from "../../website/product/product/product.model";
// import OfferModel from "../../website/offer/offer.model";
// import catchAsync from "../../../shared/catchAsync";
// import { NextFunction, Request, Response } from "express";
// import sendResponse from "../../../shared/sendResponse";
// import MerchantModel from "../../merchant/merchant/merchant.model";

// export const DashboardService = {
//   async admin(query: any) {
//     const { startDate, endDate } = query;

//     const orderFilter: any = { order_owner_type: "admin" };
//     const productFilter: any = { product_owner: "admin" };
//     const offerFilter: any = { offer_owner: "admin" };
//     if (startDate && endDate) {
//       orderFilter.createdAt = {
//         $gte: new Date(startDate as string),
//         $lte: new Date(endDate as string),
//       };
//     }

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);
//     const weekStart = new Date();
//     weekStart.setDate(weekStart.getDate() - 7);
//     const monthStart = new Date();
//     monthStart.setMonth(monthStart.getMonth() - 1);

//     const orderStats = await OrderModel.aggregate([
//       { $match: orderFilter },
//       {
//         $group: {
//           _id: null,
//           totalOrder: { $sum: 1 },
//           pendingOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "pending"] }, 1, 0] },
//           },
//           processingOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "processing"] }, 1, 0] },
//           },
//           shippedOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "shipped"] }, 1, 0] },
//           },
//           deliveredOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "delivered"] }, 1, 0] },
//           },
//           cancelOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "cancel"] }, 1, 0] },
//           },
//           returnOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "return"] }, 1, 0] },
//           },
//           todayOrder: {
//             $sum: { $cond: [{ $gte: ["$createdAt", todayStart] }, 1, 0] },
//           },
//           weeklyOrder: {
//             $sum: { $cond: [{ $gte: ["$createdAt", weekStart] }, 1, 0] },
//           },
//           monthlyOrder: {
//             $sum: { $cond: [{ $gte: ["$createdAt", monthStart] }, 1, 0] },
//           },
//           totalRevenue: { $sum: "$grand_total_amount" },
//           deliveredRevenue: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$order_status", "delivered"] },
//                 "$grand_total_amount",
//                 0,
//               ],
//             },
//           },
//         },
//       },
//     ]);

//     const totalProduct = await ProductModel.countDocuments(productFilter);

//     const totalOffer = await OfferModel.countDocuments(offerFilter);

//     const dashboardData = {
//       totalOffer,
//       totalProduct,
//       ...(orderStats[0] || {
//         totalOrder: 0,
//         pendingOrder: 0,
//         processingOrder: 0,
//         shippedOrder: 0,
//         deliveredOrder: 0,
//         cancelOrder: 0,
//         returnOrder: 0,
//         todayOrder: 0,
//         weeklyOrder: 0,
//         monthlyOrder: 0,
//         totalRevenue: 0,
//         deliveredRevenue: 0,
//       }),
//     };

//     return dashboardData;
//   },

//   async merchant(query: any) {
//     const { startDate, endDate, merchant_id } = query;

//     const orderFilter: any = {
//       merchant_id: new mongoose.Types.ObjectId(merchant_id),
//     };
//     const productFilter: any = {
//       product_owner: "merchant",
//       product_owner_id: merchant_id,
//     };
//     const offerFilter: any = {
//       offer_owner: "merchant",
//       offer_owner_id: merchant_id,
//     };
//     if (startDate && endDate) {
//       orderFilter.createdAt = {
//         $gte: new Date(startDate as string),
//         $lte: new Date(endDate as string),
//       };
//     }

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);
//     const weekStart = new Date();
//     weekStart.setDate(weekStart.getDate() - 7);
//     const monthStart = new Date();
//     monthStart.setMonth(monthStart.getMonth() - 1);

//     const orderStats = await OrderModel.aggregate([
//       { $match: orderFilter },
//       {
//         $group: {
//           _id: null,
//           totalOrder: { $sum: 1 },
//           pendingOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "pending"] }, 1, 0] },
//           },
//           processingOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "processing"] }, 1, 0] },
//           },
//           shippedOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "shipped"] }, 1, 0] },
//           },
//           deliveredOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "delivered"] }, 1, 0] },
//           },
//           cancelOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "cancel"] }, 1, 0] },
//           },
//           returnOrder: {
//             $sum: { $cond: [{ $eq: ["$order_status", "return"] }, 1, 0] },
//           },
//           todayOrder: {
//             $sum: { $cond: [{ $gte: ["$createdAt", todayStart] }, 1, 0] },
//           },
//           weeklyOrder: {
//             $sum: { $cond: [{ $gte: ["$createdAt", weekStart] }, 1, 0] },
//           },
//           monthlyOrder: {
//             $sum: { $cond: [{ $gte: ["$createdAt", monthStart] }, 1, 0] },
//           },
//           totalRevenue: { $sum: "$grand_total_amount" },
//           deliveredRevenue: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$order_status", "delivered"] },
//                 "$grand_total_amount",
//                 0,
//               ],
//             },
//           },
//         },
//       },
//     ]);

//     const totalProduct = await ProductModel.countDocuments(productFilter);

//     const totalOffer = await OfferModel.countDocuments(offerFilter);

//     const dashboardData = {
//       totalOffer,
//       totalProduct,
//       ...(orderStats[0] || {
//         totalOrder: 0,
//         pendingOrder: 0,
//         processingOrder: 0,
//         shippedOrder: 0,
//         deliveredOrder: 0,
//         cancelOrder: 0,
//         returnOrder: 0,
//         todayOrder: 0,
//         weeklyOrder: 0,
//         monthlyOrder: 0,
//         totalRevenue: 0,
//         deliveredRevenue: 0,
//       }),
//     };

//     return dashboardData
//   },

// async getAdminDashboardData(query: any) {
//   const { startDate, endDate } = query;

//   const today_start = new Date();
//   today_start.setHours(0, 0, 0, 0);
//   const week_start = new Date();
//   week_start.setDate(week_start.getDate() - 7);
//   const month_start = new Date();
//   month_start.setMonth(month_start.getMonth() - 1);

//   const date_filter: any = {};
//   if (startDate && endDate) {
//     date_filter.createdAt = {
//       $gte: new Date(startDate as string),
//       $lte: new Date(endDate as string),
//     };
//   }

//   const default_order_stats = {
//     total_order: 0,
//     pending_order: 0,
//     processing_order: 0,
//     shipped_order: 0,
//     delivered_order: 0,
//     cancel_order: 0,
//     return_order: 0,
//     today_order: 0,
//     weekly_order: 0,
//     monthly_order: 0,
//     total_revenue: 0,
//     delivered_revenue: 0,
//   };

//   const build_order_aggregate = async (filter: any) => {
//     const stats = await OrderModel.aggregate([
//       { $match: { ...filter, ...date_filter } },
//       {
//         $group: {
//           _id: null,
//           total_order: { $sum: 1 },
//           pending_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "pending"] }, 1, 0] },
//           },
//           processing_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "processing"] }, 1, 0] },
//           },
//           shipped_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "shipped"] }, 1, 0] },
//           },
//           delivered_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "delivered"] }, 1, 0] },
//           },
//           cancel_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "cancel"] }, 1, 0] },
//           },
//           return_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "return"] }, 1, 0] },
//           },
//           today_order: {
//             $sum: { $cond: [{ $gte: ["$createdAt", today_start] }, 1, 0] },
//           },
//           weekly_order: {
//             $sum: { $cond: [{ $gte: ["$createdAt", week_start] }, 1, 0] },
//           },
//           monthly_order: {
//             $sum: { $cond: [{ $gte: ["$createdAt", month_start] }, 1, 0] },
//           },
//           total_revenue: { $sum: "$grand_total_amount" },
//           delivered_revenue: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$order_status", "delivered"] },
//                 "$grand_total_amount",
//                 0,
//               ],
//             },
//           },
//         },
//       },
//     ]);
//     return stats[0] || default_order_stats;
//   };

//   // ── Admin data ──
//   const admin_order_stats = await build_order_aggregate({
//     order_owner_type: "admin",
//   });
//   const admin_total_product = await ProductModel.countDocuments({
//     product_owner: "admin",
//   });
//   const admin_total_offer = await OfferModel.countDocuments({
//     offer_owner: "admin",
//   });

//   const admin_data = {
//     total_offer: admin_total_offer,
//     total_product: admin_total_product,
//     ...admin_order_stats,
//   };

//   // ── Merchant data (no merchant_id filter, all merchants combined) ──
//   const merchant_order_stats = await build_order_aggregate({
//     order_owner_type: "merchant",
//   });
//   const merchant_total_product = await ProductModel.countDocuments({
//     product_owner: "merchant",
//   });
//   const merchant_total_offer = await OfferModel.countDocuments({
//     offer_owner: "merchant",
//   });

//   const merchant_data = {
//     total_offer: merchant_total_offer,
//     total_product: merchant_total_product,
//     ...merchant_order_stats,
//   };

//   return {
//     admin: admin_data,
//     merchant: merchant_data,
//   };
// },

// async getMerchantDashboardData(query: any, merchant_id: string) {
//   const { startDate, endDate } = query;
 
//   const today_start = new Date();
//   today_start.setHours(0, 0, 0, 0);
//   const week_start = new Date();
//   week_start.setDate(week_start.getDate() - 7);
//   const month_start = new Date();
//   month_start.setMonth(month_start.getMonth() - 1);
 
//   const date_filter: any = {};
//   if (startDate && endDate) {
//     date_filter.createdAt = {
//       $gte: new Date(startDate as string),
//       $lte: new Date(endDate as string),
//     };
//   }
 
//   const default_order_stats = {
//     total_order: 0,
//     pending_order: 0,
//     processing_order: 0,
//     shipped_order: 0,
//     delivered_order: 0,
//     cancel_order: 0,
//     return_order: 0,
//     today_order: 0,
//     weekly_order: 0,
//     monthly_order: 0,
//     total_revenue: 0,
//     delivered_revenue: 0,
//   };
 
//   const build_order_aggregate = async (filter: any) => {
//     const stats = await OrderModel.aggregate([
//       { $match: { ...filter, ...date_filter } },
//       {
//         $group: {
//           _id: null,
//           total_order: { $sum: 1 },
//           pending_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "pending"] }, 1, 0] },
//           },
//           processing_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "processing"] }, 1, 0] },
//           },
//           shipped_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "shipped"] }, 1, 0] },
//           },
//           delivered_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "delivered"] }, 1, 0] },
//           },
//           cancel_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "cancel"] }, 1, 0] },
//           },
//           return_order: {
//             $sum: { $cond: [{ $eq: ["$order_status", "return"] }, 1, 0] },
//           },
//           today_order: {
//             $sum: { $cond: [{ $gte: ["$createdAt", today_start] }, 1, 0] },
//           },
//           weekly_order: {
//             $sum: { $cond: [{ $gte: ["$createdAt", week_start] }, 1, 0] },
//           },
//           monthly_order: {
//             $sum: { $cond: [{ $gte: ["$createdAt", month_start] }, 1, 0] },
//           },
//           total_revenue: { $sum: "$grand_total_amount" },
//           delivered_revenue: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$order_status", "delivered"] },
//                 "$grand_total_amount",
//                 0,
//               ],
//             },
//           },
//         },
//       },
//     ]);
//     return stats[0] || default_order_stats;
//   };
 
//   // ── Merchant order stats (by merchant_id + owner=merchant) ──
//   const merchant_order_stats = await build_order_aggregate({
//     order_owner_type: "merchant",
//     merchant_id: new mongoose.Types.ObjectId(merchant_id),
//   });
 
//   const merchant_total_product = await ProductModel.countDocuments({
//     product_owner: "merchant",
//     product_owner_id: merchant_id,
//   });
 
//   const merchant_total_offer = await OfferModel.countDocuments({
//     offer_owner: "merchant",
//     offer_owner_id: merchant_id,
//   });
 
//   // ── Merchant wallet balance ──
//   const merchant_info = await MerchantModel.findById(merchant_id).select(
//     "merchant_wallet",
//   );
 
//   const merchant_data = {
//     wallet_balance: merchant_info?.merchant_wallet || 0,
//     total_offer: merchant_total_offer,
//     total_product: merchant_total_product,
//     ...merchant_order_stats,
//   };
 
//   return {
//     merchant: merchant_data,
//   };
// },
// };
