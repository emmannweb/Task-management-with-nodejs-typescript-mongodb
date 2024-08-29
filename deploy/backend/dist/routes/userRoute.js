"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let { isAuthenticated, isAdmin } = require("../middleware/auth");
let { allUsers, singleUser, editUser, deleteUser, } = require("../controllers/userController");
//user routes
router.get("/users", isAuthenticated, isAdmin, allUsers); // /api/users
router.get("/users/:id", isAuthenticated, singleUser); // /api/users/id
router.put("/users/edit/:id", isAuthenticated, editUser); // /api/users/edit/id
router.delete("/users/admin/delete/:id", isAuthenticated, isAdmin, deleteUser); // /api/users/admin/delete/id
module.exports = router;
