const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },

    color: {
      type: String,
      default: "#ff82bd",
      match: /^#([0-9A-Fa-f]{6})$/,
    },

    notes: {
      type: String,
      default: "",
    },

    totalStudyTime: {
      type: Number,
      default: 0,
      min: 0,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Subject", subjectSchema);
