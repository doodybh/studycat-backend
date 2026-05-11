const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
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
      trim: true,
      minlength: 5,
      match:
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2,3})?$/,
    },
    coins: {
      type: Number,
      min: 0,
    },
    level: {
      type: Number,
      min: 0,
    },
    streak: Number,
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
