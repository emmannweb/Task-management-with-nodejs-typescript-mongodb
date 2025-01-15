"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.authRoutes = router;
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
//auth routes
router.post("/users/signup", authController_1.signup); // /api/users/signup
router.post("/users/signin", authController_1.signin); // /api/users/signin
router.post("/users/logout", authController_1.logout); // /api/users/logout
router.get("/users/me", auth_1.isAuthenticated, authController_1.userProfile); // /api/users/me
router.post("/users/forgetpassword", authController_1.forgetPassword); // /api/users/forgetpassword
router.put("/users/resetpassword/:resettoken", authController_1.resetPassword); // /api/users/resetpassword/resettoken
