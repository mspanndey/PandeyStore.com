import express from "express";
import {
  GetProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  Reviews,
  getTopProduct,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const Router = express.Router();

Router.route("/top").get(getTopProduct);

// Route to get all products
Router.route("/").get(GetProduct).post(protect, admin, createProduct);
// Route to get a product by ID
Router.route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
Router.route("/:id/reviews").post(protect, Reviews);

export default Router;
