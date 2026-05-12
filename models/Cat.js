const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    color: String,
    happiness: {
      type: Number,
      default: 50,
    },

    ownedHats: [String],
    ownedCostumes: [String],
    ownedToys: [String],
    ownedBackgrounds: [String],

    equippedHat: String,
    equippedCostume: String,
    equippedToy: String,
    equippedBackground: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cat", catSchema);
