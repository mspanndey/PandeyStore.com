import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import user from "../scheme/userSchema.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not Authorized, token failed ");
    }
  } else {
    res.status(401);
    throw new Error("not Authorized cookie not found ");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Admin ");
  }
};

export { admin, protect };
