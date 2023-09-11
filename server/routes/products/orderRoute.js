import express from "express";
import Controller from "../../controllers/product/orderController.js";
import { Authenticate, authenticateSeller } from "../../middleware/Authentication.js";
export const router = express.Router();

router.route("/order/new").post(Authenticate, Controller.newOrder);
router.route("/order/me").get(Authenticate, Controller.getMyOrders);
router
  .route("/order/:id")
  .get(Authenticate, Controller.getOrderDetails)
router
  .route("/admin/orders")
  .get(
    authenticateSeller,
    Controller.getAllOrders);

