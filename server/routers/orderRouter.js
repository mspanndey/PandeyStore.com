import express from "express";
import {
  addOrderItems,
  getOrderByid,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controller/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const Router = express.Router();
// Route to get all products
Router.route("/").post(addOrderItems).get(getOrders);
// Route to get a product by ID
Router.route("/mine").get(protect, getMyOrders);
Router.route("/:id").get(getOrderByid);
Router.route("/:id/pay").put(protect, updateOrderToPaid);
Router.route("/:id/delivered").put(protect, admin, updateOrderToDelivered);

export default Router;
