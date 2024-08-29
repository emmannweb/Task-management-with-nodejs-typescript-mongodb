import mongoose, { Schema } from "mongoose";
import { IUserDocument } from "../types/IUser";
import bcrypt from "bcryptjs";
let jwt = require("jsonwebtoken");
import * as crypto from "crypto";

const userSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      maxLength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "e-mail is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid e-mail",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      minLength: [6, "Password must have at least (6) characters"],
    },

    role: {
      type: String,
      default: "user",
    },

    active: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

//GENERATE TOKEN
userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hash token and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model<IUserDocument>("User", userSchema);
