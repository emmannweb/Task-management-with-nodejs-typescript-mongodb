"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let User = require("../models/userModel");
let errorResponse = require("../utils/errorResponse");
let sendEmail = require("../utils/sendEmail");
const crypto = __importStar(require("crypto"));
exports.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const userExist = yield User.findOne({ email });
    if (userExist) {
        return next(new errorResponse("E-mail already registred", 400));
    }
    try {
        req.body.role = "user"; // this is to prevent anyone creating an admin user.
        req.body.active = false; // this is to prevent anyone activate an user.
        const user = yield User.create(req.body);
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //validation
        if (!email) {
            return next(new errorResponse("please add email", 403));
        }
        if (!password) {
            return next(new errorResponse("Please add  password", 403));
        }
        //check user email
        const user = yield User.findOne({ email });
        if (!user) {
            return next(new errorResponse("Invalid credentials", 400));
        }
        //check password
        const isMatched = yield user.comparePassword(password);
        if (!isMatched) {
            return next(new errorResponse("Invalid credentials", 400));
        }
        sendTokenResponse(user, 200, res);
    }
    catch (error) {
        next(error);
    }
});
const sendTokenResponse = (user, codeStatus, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield user.getJwtToken();
    const options = { maxAge: 60 * 60 * 1000, httpOnly: true };
    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }
    res.status(codeStatus).cookie("token", token, options).json({
        success: true,
        id: user._id,
        role: user.role,
        active: user.active,
    });
});
//log out
exports.logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "logged out",
    });
});
//user profile
exports.userProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select("-password");
    res.status(200).json({
        success: true,
        user,
    });
});
//FORGET PASSWORD
exports.forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email: req.body.email });
    if (!user) {
        return next(new errorResponse("there is no user with this e-mail", 404));
    }
    // get reset token
    const resetToken = user.getResetPasswordToken();
    yield user.save({ validateBeforeSave: false });
    //const reset url
    const resetUrl = process.env.BASE_URL + `/api/users/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) requested
   a password reset. Please click on the link below: <br/><br/>
  <a  rel="noopener noreferrer" target="_blank" href=${resetUrl}>${resetUrl}</a>
  <br/> <br/>N.B: The link will expire in 10 minutes, if it wasn't you, ignore this email.`;
    try {
        yield sendEmail({
            email: user.email,
            subject: "Reset password",
            message,
        });
        res.status(200).json({
            success: true,
            data: "Email sent",
        });
    }
    catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        yield user.save({ validateBeforeSave: false });
        return next(error);
    }
});
//RESET PASSWORD
exports.resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //hash token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resettoken)
        .digest("hex");
    try {
        const user = yield User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) {
            return next(new errorResponse("Link expired", 400));
        }
        // set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        yield user.save();
        next();
        res.status(200).json({
            success: true,
            message: "password updated with success!",
        });
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
