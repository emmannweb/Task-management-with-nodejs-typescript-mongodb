let Task = require("../models/taskModel");
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middleware/auth";

//create task
exports.createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, priority, stage, attributed } = req.body;
    const task = await Task.create({
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
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

//single task
exports.singleTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findById(req.params.task_id).populate(
      "attributed",
      "firstName"
    );

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

//all my tasks
exports.myTask = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find({ attributed: req.user?.id }).populate(
      "attributed",
      "firstName"
    );
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

//update task by id
exports.updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.task_id, req.body, {
      new: true,
    }).populate("attributed", "firstName");

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

//delete task by id
exports.deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.task_id);

    res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

//show tasks
exports.showTasks = async (req: Request, res: Response, next: NextFunction) => {
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
    const allStages: string[] = [];

    interface IStage {
      _id: string;
      count: number;
    }

    const stages: IStage[] = await Task.aggregate([
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

    stages.forEach((stage: IStage) => {
      allStages.push(stage._id); // array of stages for filtering
    });

    const qstage = req.query.qstage || "";
    const stageFilter = qstage ? (<string>qstage).split(",") : allStages;

    //Task by priority
    const priorities: string[] = [];

    interface IPriority {
      _id: string;
      priority: string;
    }

    const taskByPriority = await Task.find({}, { priority: 1 });
    taskByPriority.forEach((val: IPriority) => {
      priorities.push(val.priority);
    });

    let setUniquePriority = [...new Set(priorities)];
    let priority = req.query.priority;
    let PriorityFilter = priority !== "" ? priority : setUniquePriority;

    //enable pagination
    const pageSize: number = 4;
    const page: number = Number(req.query.pageNumber) || 1;
    const count: number = await Task.find({
      ...keyword,
      stage: { $in: [...stageFilter] },
      priority: PriorityFilter,
    }).countDocuments();

    //stat for task
    const countStat: number = await Task.find({}).countDocuments();

    const tasks = await Task.find({
      ...keyword,
      stage: { $in: [...stageFilter] },
      priority: PriorityFilter,
    })
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
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
