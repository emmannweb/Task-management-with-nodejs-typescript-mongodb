import express from "express";
const router = express.Router();
let { isAuthenticated, isAdmin } = require("../middleware/auth");
let {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");

//user routes
router.get("/users", isAuthenticated, isAdmin, allUsers); // /api/users
router.get("/users/:id", isAuthenticated, singleUser); // /api/users/id
router.put("/users/edit/:id", isAuthenticated, editUser); // /api/users/edit/id
router.delete("/users/admin/delete/:id", isAuthenticated, isAdmin, deleteUser); // /api/users/admin/delete/id

module.exports = router;
