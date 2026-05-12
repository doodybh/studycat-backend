const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema(
  {
    duration: {
      type: Number,
      required: true,
    },

    coinsEarned: {
      type: Number,
      default: 0,
    },

    xpEarned: {
      type: Number,
      default: 0,
    },

    completedAt: {
      type: Date,
      default: Date.now,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("StudySession", studySessionSchema);
