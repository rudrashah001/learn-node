const express = require("express");
const router = express.Router();

const { getAllUsers, createUser } = require("../controllers/userController");
const { getUserById, updateUser, deleteUser } = require("../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
