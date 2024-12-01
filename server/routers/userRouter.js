import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUserById,
  updateUser,
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const Router = express.Router();
// Route to get all products
Router.route("/").post(registerUser).get(protect, admin, getUsers);
// Route to get a product by ID
Router.post("/logout", logoutUser);
Router.post("/login", authUser);
Router.route("/profile")
  .post(protect, getUserProfile)
  .put(protect, updateUserProfile);
Router.route("/:id")
  .delete(protect, admin, deleteUsers)
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById);

export default Router;
