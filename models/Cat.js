const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // minlength: 2,
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

    // this is probably gonna be a future feature (unless i have the time to do it)
    // ownedCostumes: {
    //   type: [String],
    //   default: [],
    // },

    // this is probably gonna be a future feature (unless i have the time to do it)
    // ownedToys: {
    //   type: [String],
    //   default: [],
    // },

    ownedGlasses: {
      type: [String],
      default: [],
    },

    ownedBackgrounds: {
      type: [String],
      default: ["background-1"],
    },

    equippedHat: {
      type: String,
      default: "",
    },

    equippedGlasses: {
      type: String,
      default: "",
    },

    // this is probably gonna be a future feature (unless i have the time to do it)
    // equippedCostume: {
    //   type: String,
    //   default: "",
    // },

    // this is probably gonna be a future feature (unless i have the time to do it)
    // equippedToy: {
    //   type: String,
    //   default: "",
    // },

    equippedBackground: {
      type: String,
      default: "background-1",
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
