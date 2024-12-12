const mongoose = require("mongoose")
const Workout = require("../model/workoutsSchema")

// Get all the workouts
const getAllWorkouts = async (req,res) =>{
  const user_id = req.user._id

  try {
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)
  } catch (error) {
    res.status(400).json({error: "workouts couldn't be loaded."})
  }
}

// Get a single workout
const getSingleWorkout = async (req,res)=>{
  const {_id} = req.params

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(400).json({error: "this is not a valid id."})
  }

  const workout = await Workout.findById({_id})

  if(!workout){
    return res.status(400).json({error: "workout doesn't exist."})
  }

  res.status(200).json(workout)
}

// Create a single workout
const createWorkout = async (req,res)=>{
  const {title,load,reps} = req.body
  const emptyFields = []
  const user_id = req.user._id

  if(!title){
    emptyFields.push("title")
  }

  if(!load){
    emptyFields.push("load")
  }

  if(!reps){
    emptyFields.push("reps")
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: "all the fields must be filled in.", emptyFields})
  }

  try {
    const workouts = await Workout.create({title,load,reps,user_id})
    res.status(200).json(workouts)
  } catch (error) {
    res.status(400).json({error: "workout couldn't be created."})
  }
}

// Update a single workout
const updateWorkout = async (req,res)=>{
  const {_id} = req.params

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(400).json({error: "this is not a valid id."}) 
  }

  const workout = await Workout.findByIdAndUpdate({_id},{
    ...req.body
  })

  if(!workout){
    return res.status(400).json({error: "workout doesn't exist."})
  }

  res.status(200).json(workout)
}

// Delete a single workout
const deleteWorkout = async (req,res)=>{
  const {_id} = req.params

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(400).json({error: "this is not a valid id."})
  }

  const workout = await Workout.findByIdAndDelete({_id})

  if(!workout){
    return res.status(400).json({error: "workout couldn't be deleted."})
  }

  res.status(200).json(workout)
}

module.exports = {getAllWorkouts,getSingleWorkout,createWorkout,updateWorkout,deleteWorkout}