const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
    },

    color: {
      type: String,
      default: "#f4a261",
      match: /^#([0-9A-Fa-f]{6})$/,
    },

    happiness: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },

    ownedHats: {
      type: [String],
      default: [],
    },

    ownedCostumes: {
      type: [String],
      default: [],
    },

    ownedToys: {
      type: [String],
      default: [],
    },

    ownedBackgrounds: {
      type: [String],
      default: [],
    },

    equippedHat: {
      type: String,
      default: "",
    },

    equippedCostume: {
      type: String,
      default: "",
    },

    equippedToy: {
      type: String,
      default: "",
    },

    equippedBackground: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cat", catSchema);
