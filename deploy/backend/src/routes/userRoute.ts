import express from "express";
const router = express.Router();
import { isAuthenticated, isAdmin } from "../middleware/auth";
import {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
} from "../controllers/userController";

//user routes
router.get("/users", isAuthenticated, isAdmin, allUsers); // /api/users
router.get("/users/:id", isAuthenticated, singleUser); // /api/users/id
router.put("/users/edit/:id", isAuthenticated, editUser); // /api/users/edit/id
router.delete("/users/admin/delete/:id", isAuthenticated, isAdmin, deleteUser); // /api/users/admin/delete/id

export { router as userRoutes };
