import ErrorHandler from "../../utility/errorHandlerClass.js";
import { AsyncError } from "../../middleware/AsyncError.js";
import Order from "../../models/product/Order.js";
import { io } from '../../server.js'
import SellerProduct from "../../models/seller/SellerProduct.js";
import User from "../../models/user/User.js";
import Notification from "../../models/seller/notification.js";
import Seller from "../../models/seller/seller.js";
import sendMail from "../../utility/sendMail.js";
import OrderStatus from "../../static/emails/status.js";
import IncomeExpenses from "../../models/seller/income-expenses.js";

class Controller {
  static newOrder = AsyncError(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      taxPrice,
      shippingPrice,
      itemsPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      taxPrice,
      shippingPrice,
      itemsPrice,
      totalPrice,
      user: req.user._id,
      paidAt: Date.now(),
    });

    const user = await User.findById(req.user._id);

    const status = await OrderStatus(order, user, "Booked");
    sendMail(user.email, status.emailSubject, status.emailHTML);

    for (const orderItem of orderItems) {
      const product = await SellerProduct.findById(orderItem.product);

      if (product) {
        const ownerId = product.seller;

        if (ownerId) {
          let sell = await Seller.findById(ownerId);

          // Ensure that income and expenses are valid numbers
          const itemIncome = parseInt(product?.price, 10) * parseInt(orderItem?.quantity, 10);
          const itemExpenses = parseInt(product?.manufacturingCost, 10) * parseInt(orderItem?.quantity, 10);

          if (!isNaN(itemIncome) && !isNaN(itemExpenses)) {
            let incExp = await IncomeExpenses.findOne({ seller: sell._id })
            if (incExp) {
              incExp.income += itemIncome
              incExp.expenses += itemExpenses
              await incExp.save()
            } else {
              await IncomeExpenses.create({
                income: itemIncome,
                expenses: itemExpenses,
                seller: sell._id
              })
            }
            const message = `${user.name} placed an order for ${product.name}`;
            let notification = await Notification.create({
              type: "message",
              message,
              seller: ownerId,
            });

            io.emit("newOrder", { seller: ownerId, notification });
          }
        }
      }
    }

    res.status(201).json({ success: true, order });
  });


  //   Get single order details(For user)
  static getOrderDetails = AsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(new ErrorHandler(404, "Order not found."));
    }
    res.status(200).json({ success: true, order });
  });
  //   Get single order details(For Seller)
  static getSellerOrderDetails = AsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(new ErrorHandler(404, "Order not found."));
    }
    res.status(200).json({ success: true, order });
  });

  //   Logged in user orders

  static getMyOrders = AsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({ success: true, orders });
  });

  //   get all orders


  // Seller Orders
  static getAllOrders = AsyncError(async (req, res, next) => {
    // const orders = await Order.find();
    const sellerId = req.seller
    let orders = await Order.find({})
      .populate({
        path: 'orderItems.product',
        model: 'sellerProduct',
      });

    orders = orders.length > 0 && orders.filter(order =>
      order.orderItems.some(item => item?.product?.seller?.equals(sellerId))
    );



    let totalBalance = 0;
    orders.length > 0 && orders.forEach((element) => {
      totalBalance += element.totalPrice;
    });
    res.status(200).json({ success: true, orders, totalBalance });

  });

  static updateStock = async (id, quantity) => {
    const product = await SellerProduct.findById(id);
    product.Stock = product.Stock - quantity;
    await product.save();
  };

  //   update order status (Admin Route)
  static updateOrderStatus = AsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler(404, "Order not found."));
    }
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler(400, "Order already delivered."));
    }

    if (order.orderStatus === "Shipped") {
      order.orderItems.forEach(async (element) => {
        await this.updateStock(element.product, element.quantity);
      });
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.delivered = Date.now();
    }
    await order.save();
    const user = await User.findById(order.user)

    const status = await OrderStatus(order, user)
    sendMail(user.email, status.emailSubject, status.emailHTML)
    res
      .status(200)
      .json({ success: true, message: "Status change successfully." });
  });

  //   Delete Order

  static deleteOrder = AsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler(404, "Order not found."));
    }

    await order.remove();
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully." });
  });

  static noOfOrderWithStatus = AsyncError(async (req, res) => {


    const sellerId = req.seller
    let orders = await Order.find({})
      .populate({
        path: 'orderItems.product',
        model: 'sellerProduct',
      });

    orders = orders.length > 0 && orders.filter(order =>
      order.orderItems.some(item => item?.product?.seller?.equals(sellerId))
    );
    let processingCount = 0
    let shippedCount = 0
    let deliveredCount = 0
    for (let index = 0; index < orders?.length; index++) {
      if (orders[index].orderStatus === "Processing") processingCount++
      if (orders[index].orderStatus === "Delivered") deliveredCount++
      if (orders[index].orderStatus === 'Shipped') shippedCount++

    }

    res.status(200).json({ success: true, processingCount, shippedCount, deliveredCount })
  })



}

export default Controller;
