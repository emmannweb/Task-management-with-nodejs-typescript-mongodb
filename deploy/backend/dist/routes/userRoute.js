"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.userRoutes = router;
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controllers/userController");
//user routes
router.get("/users", auth_1.isAuthenticated, auth_1.isAdmin, userController_1.allUsers); // /api/users
router.get("/users/:id", auth_1.isAuthenticated, userController_1.singleUser); // /api/users/id
router.put("/users/edit/:id", auth_1.isAuthenticated, userController_1.editUser); // /api/users/edit/id
router.delete("/users/admin/delete/:id", auth_1.isAuthenticated, auth_1.isAdmin, userController_1.deleteUser); // /api/users/admin/delete/id
