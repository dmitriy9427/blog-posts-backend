import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  tags: {
    type: Array,
    default: [],
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
});

export default mongoose.model("Post", PostModel);
