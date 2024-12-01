import mongoose from "mongoose";

const Connection = async () => {
  try {
    const conn = mongoose.connect(process.env.CSTRING);
    console.log("Database Connected ");
  } catch (err) {
    console.log("error", err);
  }
};

export default Connection;
