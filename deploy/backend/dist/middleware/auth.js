"use strict";
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
let errorResponse = require("../utils/errorResponse");
let jwt = require("jsonwebtoken");
let User = require("../models/userModel");
//check if user is authenticated
exports.isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    // Make sure token exists
    if (!token) {
        return next(new errorResponse("You must Log in!", 401));
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = yield User.findById(decoded.id);
        next();
    }
    catch (error) {
        return next(new errorResponse("You must Log in!", 401));
    }
});
//middleware for admin
exports.isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "user") {
        return next(new errorResponse("Access denied, you must be an Admin", 401));
    }
    next();
});
