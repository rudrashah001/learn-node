const User = require("../models/User");
const errorHandler = require("../middleware/errorhandler");
const status = require("statuses");
// const getAllUsers = (req, res) => {
//   res.status(200).json({ success: true, data: users });
// };

// const getUserById = (req, res) => {
//   const { id } = req.params;
//   const user = users.find((u) => u.id === id);
//   if (!user) {
//     return res.status(404).json({ success: false, message: "user not found" });
//   }
//   res.status(200).json({ success: true, data: user });
// };


const getAllUsers = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }
    
    if (req.query.email) {
      filters.email = req.query.email;
    }

    const users = await User.find(filters).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const err = new Error("user not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// create user
// const createUser = (req, res) => {
//   const { name, email } = req.body;
//   if (!name || !email) {
//     return res
//       .status(400)
//       .json({ success: false, message: "name and email are required" });
//   }
//   const newUser = {
//     id: getNextId(),
//     name,
//   };
//   users.push(newUser);
//   res.status(201).json({ success: true, data: newUser });
// };

const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// update user

// const updateUser = (req , res, next)=>{
//   const { id } = req.params;
//   const updatedData = req.body;
//   const index = users.findIndex((u) => u.id === id);
//   if (index === -1) {
//     const err = new Error("user not found");
//     err.status = 404;
//     return next(err);
//     // return res.status(404).json({ success: false, message: "user not found" });
//   }

//   users[index] = {
//     ...users[index],
//     ...updatedData,
//   };

//   res.status(200).json({
//     success: true,
//     data: users[index],
//   });

// }

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findUserByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true });
    
    if (!user) {
      const err = new Error("user not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}; 

// delete user
// const deleteUser = (req, res, next) => {
//   const { id } = req.params;
//   const index = users.findIndex((u) => u.id === id);
//   if (index === -1) {
//     const err = new Error("user not found");
//     err.status = 404;
//     return next(err);
//     // return res.status(404).json({ success: false, message: "user not found" });
//   }
//   users.splice(index, 1);
//   res.status(200).json({
//     success: true,
//     message: "user deleted successfully",
//   });
// };

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      const err = new Error("user not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

let nextId = 3;

const getNextId = () => nextId++;

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
