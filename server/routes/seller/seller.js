import express from "express";
import Controller from "../../controllers/seller/Controller.js";
import { authenticateSeller } from "../../middleware/Authentication.js";
import ProductController from "../../controllers/seller/ProductController.js";
import { Authenticate } from "../../middleware/Authentication.js";
import OrderController from '../../controllers/product/orderController.js'
export const sellerRouter = express.Router();

sellerRouter.route("/seller/register").post(Controller.register)
sellerRouter.route("/seller/login").post(Controller.login)
sellerRouter.route("/seller/verify").post(authenticateSeller, Controller.verifyOTP)
sellerRouter.route("/seller/resend-otp").get(authenticateSeller, Controller.resendOTP)
sellerRouter.route("/seller/profile").get(authenticateSeller, Controller.profile)



sellerRouter.route("/seller/product/new").post(authenticateSeller, ProductController.createProduct)
sellerRouter.route("/seller/products").get(authenticateSeller, ProductController.getAllProducts)
sellerRouter.route("/seller/product/:id").get(authenticateSeller, ProductController.getSingleProduct).put(authenticateSeller, ProductController.updateProduct).delete(authenticateSeller, ProductController.deleteProduct)
sellerRouter.route("/seller/stock/:id").put(authenticateSeller, ProductController.updateProductStock)
sellerRouter.route('/seller/logout').get(authenticateSeller, Controller.logout)
sellerRouter.route("/product/review/:id").get(ProductController.getAllReviews).delete(Authenticate, ProductController.deleteReview);
sellerRouter.route("/product/review").put(Authenticate, ProductController.productReview);
sellerRouter.route("/notifications").get(authenticateSeller, ProductController.getAllNotification)
sellerRouter.route("/notification/:id").put(ProductController.updateNotificationStatus)
sellerRouter.route("/seller/orders").get(authenticateSeller, OrderController.getAllOrders)
sellerRouter.route("/seller/order/:id").get(authenticateSeller, OrderController.getSellerOrderDetails).delete(authenticateSeller, OrderController.deleteOrder).put(authenticateSeller, OrderController.updateOrderStatus)
sellerRouter.route('/seller/total-product').get(authenticateSeller,ProductController.calculateProduct)
sellerRouter.route('/seller/overall-incExp').get(authenticateSeller,ProductController.overAllIncomeExpense)
sellerRouter.route('/seller/year-incExp').get(authenticateSeller,ProductController.yearWiseIncomeExpense)
sellerRouter.route('/seller/noOfOrderWithStatus').get(authenticateSeller,OrderController.noOfOrderWithStatus)
sellerRouter.route('/seller/stock-count').get(authenticateSeller,ProductController.countStockInOut)


sellerRouter
  .route("/seller/product/review/:id")
  .get(ProductController.getAllReviews)
  .delete(Authenticate, ProductController.deleteReview);