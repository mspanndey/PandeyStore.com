import mongoose from "mongoose";
import "dotenv/config";
import "colors";
import users from "./data/user.js";
import products from "./data/products.js";
import Product from "./scheme/productSchema.js";
import Order from "./scheme/orderSchema.js";
import User from "./scheme/userSchema.js";
import Connection from "./config/connection.js";

Connection();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createUser = await User.insertMany(users);

    const admin_user = createUser[0]._id;

    const simpleProducts = products.map((product) => {
      return { ...product, user: admin_user };
    });

    await Product.insertMany(simpleProducts);
    console.log("Data uploaded successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.log("Error".red.inverse, error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log("Error while deleting data".red.inverse, error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
