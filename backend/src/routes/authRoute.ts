import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  logout,
  userProfile,
  forgetPassword,
  resetPassword,
} from "../controllers/authController";

import { isAuthenticated } from "../middleware/auth";

//auth routes
router.post("/users/signup", signup); // /api/users/signup
router.post("/users/signin", signin); // /api/users/signin
router.post("/users/logout", logout); // /api/users/logout
router.get("/users/me", isAuthenticated, userProfile); // /api/users/me
router.post("/users/forgetpassword", forgetPassword); // /api/users/forgetpassword
router.put("/users/resetpassword/:resettoken", resetPassword); // /api/users/resetpassword/resettoken

export { router as authRoutes };
