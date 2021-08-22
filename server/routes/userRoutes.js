const express = require("express");
const { authUser, register, update } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.route("/signup").post(register);

userRouter.post("/signin", authUser);

userRouter.route("/profile").post(protect, update);

module.exports = userRouter;
