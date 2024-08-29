"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let { isAuthenticated, isAdmin } = require("../middleware/auth");
let { createTask, singleTask, myTask, updateTask, deleteTask, showTasks, } = require("../controllers/taskController");
//task routes
router.post("/tasks/create", isAuthenticated, isAdmin, createTask); // /api/tasks/create
router.get("/tasks/all", showTasks); // /api/tasks/all
router.get("/tasks/:task_id", singleTask); // /api/tasks/task_id
router.get("/mytask", isAuthenticated, myTask); // /api/mytask
router.put("/tasks/admin/edit/:task_id", isAuthenticated, updateTask); // /api/tasks/admin/edit/task_id
router.delete("/tasks/delete/:task_id", isAuthenticated, isAdmin, deleteTask); // /api/tasks/delete/task_id
module.exports = router;
