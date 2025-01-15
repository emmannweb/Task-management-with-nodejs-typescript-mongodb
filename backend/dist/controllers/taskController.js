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
exports.showTasks = exports.deleteTask = exports.updateTask = exports.myTask = exports.singleTask = exports.createTask = void 0;
const taskModel_1 = require("../models/taskModel");
//create task
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, priority, stage, attributed } = req.body;
        const task = yield taskModel_1.Task.create({
            title,
            description,
            priority,
            stage,
            attributed,
        });
        res.status(201).json({
            success: true,
            task,
        });
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.createTask = createTask;
//single task
const singleTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskModel_1.Task.findById(req.params.task_id).populate("attributed", "firstName");
        res.status(200).json({
            success: true,
            task,
        });
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.singleTask = singleTask;
//all my tasks
const myTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tasks = yield taskModel_1.Task.find({ attributed: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }).populate("attributed", "firstName");
        res.status(200).json({
            success: true,
            tasks,
        });
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.myTask = myTask;
//update task by id
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskModel_1.Task.findByIdAndUpdate(req.params.task_id, req.body, {
            new: true,
        }).populate("attributed", "firstName");
        res.status(200).json({
            success: true,
            task,
        });
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.updateTask = updateTask;
//delete task by id
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskModel_1.Task.findByIdAndDelete(req.params.task_id);
        res.status(200).json({
            success: true,
            message: "task deleted",
        });
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.deleteTask = deleteTask;
//show tasks
const showTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //enable search
        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            }
            : {};
        //enable stage filter
        const allStages = [];
        const stages = yield taskModel_1.Task.aggregate([
            {
                $project: {
                    stage: 1,
                },
            },
            {
                $group: {
                    _id: "$stage",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        stages.forEach((stage) => {
            allStages.push(stage._id); // array of stages for filtering
        });
        const qstage = req.query.qstage || "";
        const stageFilter = qstage ? qstage.split(",") : allStages;
        //Task by priority
        const priorities = [];
        const taskByPriority = yield taskModel_1.Task.find({}, { priority: 1 });
        taskByPriority.forEach((val) => {
            priorities.push(val.priority);
        });
        let setUniquePriority = [...new Set(priorities)];
        let priority = req.query.priority;
        let PriorityFilter = priority !== "" ? priority : setUniquePriority;
        //enable pagination
        const pageSize = 4;
        const page = Number(req.query.pageNumber) || 1;
        const count = yield taskModel_1.Task.find(Object.assign(Object.assign({}, keyword), { stage: { $in: [...stageFilter] }, priority: PriorityFilter })).countDocuments();
        //stat for task
        const countStat = yield taskModel_1.Task.find({}).countDocuments();
        const tasks = yield taskModel_1.Task.find(Object.assign(Object.assign({}, keyword), { stage: { $in: [...stageFilter] }, priority: PriorityFilter }))
            .sort({ createdAt: -1 })
            .populate("attributed", "firstName")
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        res.status(200).json({
            success: true,
            stages,
            tasks,
            setUniquePriority,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            countStat,
        });
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.showTasks = showTasks;
