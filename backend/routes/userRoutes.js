const express = require("express")
const userRouter = express.Router()

// user controllers
const {login,signup} = require("../controllers/userControllers")

// user login
userRouter.post("/login", login)

// user signup
userRouter.post("/signup", signup)

module.exports = userRouter