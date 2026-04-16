const { message } = require("statuses");
const { tasks, getNextId } = require("../data/tasks");
const errorHandler = require("../middleware/errorhandler");
const Task = require("../models/Tasks");

// add , delete , update , get all ,get by id

// crud -> create , read , update , delete


// const getAllTasks = (req, res , next) => {
//   const { status, priority } = req.query;
//   let results = tasks;
//   if (status) {
//     results = results.filter((task) => task.status === status);
//   }
//   if (priority) {
//     results = results.filter((task) => task.priority === priority);
//   }
//   res.status(200).json({
//     success: true,
//     data: results,
//     count: results.length,
//   });
// };

const getAllTasks = async (req, res , next) => {
  try{
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (err) {
    next(err);
  }
};



// const getTaskById = (req,res,next) => {
//   try{
//   const { id } = req.params;
//   const task = tasks.find((t) => t.id === Number(id));
  
//   if (!task) {
//     const err = new Error("task not found");
//     err.status = 404;
//     throw err;
//   }

//   res.status(200).json({
//     success: true,
//     data: task,
//   });
//  } catch (err) {
//     next(err);
//   }
// };

const getTaskById = async (req,res,next) => {
  try{
   
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      const err = new Error("task not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
}


// create task
// const createTask = (req, res) => {
//   const { title, description, time, assigned, status } = req.body;

//   if (title) {
//     return res.status(400).json({
//       success: false,
//       message: "title is required",
//     });
//   }
//   const newTask = {
//     id: getNextId(),
//     title,
//     description: description || "",
//     time: time || new Date().toISOString(),
//     assigned: assigned || "unassigned",
//     status: status || "pending",
//   };
//   tasks.push(newTask);
//   res.status(201).json({
//     success: true,
//     data: newTask,
//   });
// };

const createTask =async (req, res , next) => {
  try{
    const task = await Task.create(req.body);
    
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);

  }
}

// update task

// const updateTask = (req, res , next) => {
//   try {
//   const { id } = req.params;
//   const updatedData = req.body;

//   const index = tasks.findIndex((t) => t.id === Number(id));
//   if (index === -1) {
//     const err = new Error("task not found");
//     err.status = 404;
//     throw err;
//   }
  
//   tasks[index] = {
//     ...tasks[index],
//     ...updatedData,
//   };

//   res.status(200).json({
//     success: true,
//     data: tasks[index],
//   });
// } catch (err) {
//     next(err);
//   }
// };


const updateTask = async (req, res , next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!task) {
      const err = new Error("task not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// delete task

// const deleteTask = (req, res , next) => {
//   try{
//   const { id } = req.params;
//   const index = tasks.findIndex((t) => t.id === Number(id));
//   if (index === -1) {
//     const err = new Error("task not found");
//     err.status = 404;
//     throw err;
//   }

//   tasks.splice(index, 1);

//   res.status(200).json({
//     success: true,
//     message: "task deleted",
//   });
// } catch (err) {
//     next(err);
//   }
// };

const deleteTask = async (req, res , next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      const err = new Error("task not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
