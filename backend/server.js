require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const workoutsRoutes = require("./routes/workoutsRoutes")

// middleware
app.use(express.json())
app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})

// app routes
app.use("/api/workouts",workoutsRoutes)

// server conecction
mongoose.connect(process.env.MONGOOSE_URI)
.then(() => {
  app.listen(process.env.PORT,()=>{
    console.log("server & db listening on port:",process.env.PORT)
  })
}).catch((err) => {
  console.log("error:",err)
})