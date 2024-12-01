import path from "path";
import Express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connection.js";
import productRouters from "./routers/Routers.js";
import errormiddleware from "./middleware/errormiddleware.js";
import userRouter from "./routers/userRouter.js";
import ordersRoute from "./routers/orderRouter.js";
import uploadRoute from "../server/routers/uploadsRoute.js";

dotenv.config();
const port = process.env.PORT;
const app = Express();
const { notFound, errorHandler } = errormiddleware;
const corsOptions = {
  origin: "http://localhost:3000", // Frontend URL
  credentials: true, // Allow cookies to be sent/received
};
app.use(cors(corsOptions));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDb();

app.use("/api/products", productRouters);
app.use("/api/users", userRouter);
app.use("/api/orders", ordersRoute);
app.use("/api/upload", uploadRoute);
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", Express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(Express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("app is running.......");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`your app is running ${port}`);
});
