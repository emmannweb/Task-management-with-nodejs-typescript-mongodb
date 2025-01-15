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
exports.deleteUser = exports.editUser = exports.singleUser = exports.allUsers = void 0;
const userModel_1 = require("../models/userModel");
//load all users
const allUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find().sort({ createdAt: -1 }).select("-password");
        res.status(200).json({
            success: true,
            users,
        });
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.allUsers = allUsers;
//show single user
const singleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findById(req.params.id).select("-password");
        res.status(200).json({
            success: true,
            user,
        });
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.singleUser = singleUser;
//edit single user
const editUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            user,
        });
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.editUser = editUser;
//delete user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.deleteOne({ _id: req.params.id });
        res.status(200).json({
            success: true,
            message: "user deleted",
        });
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteUser = deleteUser;
