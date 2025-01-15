"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.taskRoutes = router;
const auth_1 = require("../middleware/auth");
const taskController_1 = require("../controllers/taskController");
//task routes
router.post("/tasks/create", auth_1.isAuthenticated, auth_1.isAdmin, taskController_1.createTask); // /api/tasks/create
router.get("/tasks/all", taskController_1.showTasks); // /api/tasks/all
router.get("/tasks/:task_id", taskController_1.singleTask); // /api/tasks/task_id
router.get("/mytask", auth_1.isAuthenticated, taskController_1.myTask); // /api/mytask
router.put("/tasks/admin/edit/:task_id", auth_1.isAuthenticated, taskController_1.updateTask); // /api/tasks/admin/edit/task_id
router.delete("/tasks/delete/:task_id", auth_1.isAuthenticated, auth_1.isAdmin, taskController_1.deleteTask); // /api/tasks/delete/task_id
