const express = require("express")
const userRoutes = express.Router()
const {userSignup,userLogin} = require("../controllers/userControllers")

userRoutes.post("/signup", userSignup)
userRoutes.post("/login", userLogin)

module.exports = userRoutes