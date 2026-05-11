const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    duration: Number,
    coinsEarned: Number,
    xpEarned: Number,
    completedAt: String,
    subject: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cat", catSchema);
