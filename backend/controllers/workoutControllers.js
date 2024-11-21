const Workout = require("../model/workoutModel")
const mongoose = require("mongoose")

const getAllWorkouts = async (req,res) =>{
  try {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

const getSingleWorkout = async(req,res)=>{
  const {id} = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: "This is not a valid id."})
  }

  const workout = await Workout.findById(id)

  if(!workout){
    return res.status(400).json({error: "Not such workout."})
  }

  res.status(200).json(workout)
}

const createSingleWorkout = async(req,res)=>{
  const {title,reps,load} = req.body
  const isEmpty = []

  if(!title){
    isEmpty.push("title")
  }

  if(!reps){
    isEmpty.push("reps")
  }

  if(!load){
    isEmpty.push("load")
  }

  if(isEmpty.length > 0){
    return res.status(400).json({error: "All the fields must be filled in.", isEmpty})
  }

  try {
    const workout = await Workout.create({title,reps,load})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

const updateWorkout = async(req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"This is not a valid id."})
  }

  const workout = await Workout.findByIdAndUpdate(id,{
    ...req.body
  })

  if(!workout){
    return res.status(400).json({error: "Not such a workout."})
  }

  res.status(200).json(workout)
}

const deleteWorkout = async(req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: "This is not a valid id."})
  }

  const workout = await Workout.findByIdAndDelete(id)

  if(!workout){
    return res.status(400).json({error: "Not such workout."})
  } 

  res.status(200).json(workout)
}

module.exports = {getAllWorkouts,getSingleWorkout,createSingleWorkout,updateWorkout,deleteWorkout}