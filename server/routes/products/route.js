import express from "express";
import Controller from "../../controllers/product/controller.js";
import { Authenticate } from "../../middleware/Authentication.js";

export const router = express.Router();


router.route("/products").get(Controller.getAllProducts);
router.route("/product/:id").get(Controller.singleProduct);

router.route("/product/review").put(Authenticate, Controller.productReview);
router.route("/all/products").get(Controller.getProducts)
router
  .route("/product/review/:id")
  .get(Controller.getAllReviews)
  .delete(Authenticate, Controller.deleteReview);
router.route("/product/similar/:productId").get(Controller.similiarProducts)