require("dotenv").config()
const express = require("express")
const workoutsRouter = require("./routes/workoutRoutes")
const mongoose = require("mongoose")

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()  
})

//routes
app.use("/api/workouts", workoutsRouter)

//listen for request

mongoose.connect(process.env.DATABASE_URI).
then(() => {
  app.listen(process.env.PORT, ()=>{
    console.log("Server listening on port", process.env.PORT)
  }) 
}).catch((error) => {
  console.log(error)
});