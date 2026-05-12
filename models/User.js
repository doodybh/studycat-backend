const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
      unique: true,
      lowercase: true,
    },

    hashedPassword: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 5,
      maxlength: 100,

      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    coins: {
      type: Number,
      default: 0,
      min: 0,
    },

    xp: {
      type: Number,
      default: 0,
      min: 0,
    },

    level: {
      type: Number,
      default: 1,
      min: 1,
    },

    streak: {
      type: Number,
      default: 0,
    },

    happiness: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
