const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// creating order
const createOrder = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      throw new CustomError.NotFoundError("Cart is empty or not found", 404);
    }

    // Create an order
    const newOrder = await Order.create({
      userId: cart.userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
    });
    console.log(newOrder);

    // Clear the cart after order is created
    await Cart.findOneAndUpdate(
      { userId },
      { items: [], totalPrice: 0, totalItems: 0 }
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "Order have beeen created",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);

    throw new CustomError.BadRequestError("Something went wrong.");
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  let { status } = req.body;

  if (!orderId) {
    throw new CustomError.BadRequestError("Please do provide OrderId");
  }

  // Convert the status to lowercase
  status = status.toLowerCase();

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Something went wrong.");
  }
};

const orderHistory = async (req, res) => {
  const userId = req.user.role === "admin" ? req.body.userId : req.user.userId;

  try {
    // const orders = await Order.fin
    const orders = await Order.find({ userId })
      .populate({
        path: "userId",
        select: "name",
      })
      .populate({
        path: "items.productId",
        select: "brand article images ",
      })

      .sort({ createdAt: -1 });
    console.log(orders);
    const countOrder = orders.length;

    if (orders.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: true, msg: "No order found." });
    } else {
      // const orderCount = await Order.countDocuments(userId);
      // console.log(orderCount);

      res.status(StatusCodes.OK).json({
        success: true,
        data: orders,
        totalOrder: countOrder,
      });
    }
  } catch (error) {
    throw new CustomError.BadRequestError(`Something went wrong. => ${error}`);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ path: "userId", select: "name" })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No orders found" });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    throw new CustomError.BadRequestError("Something went wrong.");
  }
};

module.exports = { createOrder, orderHistory, updateOrderStatus, getAllOrders };
