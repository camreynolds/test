const express = require("express")
const app = express()
require("dotenv").config()
const workoutsRouter = require("./routes/workoutsRoutes")

// middleware
app.use(express.json())

// endpoints
app.use("/api/workouts", workoutsRouter)

// server running
app.listen(process.env.PORT, ()=>{
  console.log("server running at port:",process.env.PORT)
})