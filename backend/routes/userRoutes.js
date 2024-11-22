const {signup,login} = require("../controllers/userControllers")
const express = require("express")
const userRoutes= express.Router()

userRoutes.post("/signup", signup)
userRoutes.post("/login", login)

module.exports = userRoutes