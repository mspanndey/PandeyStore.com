import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: String,
  email: String,
});

const sending_data = mongoose.model("PracticeUser", user);

const Post = new mongoose.Schema({
  post: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "PracticeUser" },
});

const PracticePost = mongoose.model("PraticePost", Post);

export { sending_data, PracticePost }; // Named exports
