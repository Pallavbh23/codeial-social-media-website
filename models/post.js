const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);
const post = mongoose.model("user", postSchema);

module.exports = post;
