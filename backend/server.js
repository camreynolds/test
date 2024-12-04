require("dotenv").config()
const express = require("express")
const app = express()
const workoutsRouter = require("./routes/workoutsRoutes")
const mongoose = require("mongoose")

// middleware
app.use(express.json())
app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})

// endpoints
app.use("/api/workouts", workoutsRouter)

// server & database running
mongoose.connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, ()=>{
      console.log("server & database running at port:",process.env.PORT)
    })
  )
  .catch(error =>{
    console.log(error)
  })