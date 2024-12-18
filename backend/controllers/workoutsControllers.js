const mongoose = require("mongoose")
const Workout = require("../model/workoutsSchema")

// get all the workouts
const getAllWorkouts = async(req,res)=>{
  const user_id = req.user._id

  try {
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// get a single workout
const getSingleWorkout = async (req,res)=>{
  const {_id} = req.params

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(400).json({error: "This is not a valid id."})
  }

  const workout = await Workout.findById({_id})

  if(!workout){
    return res.status(400).json({error: "Workout doesn't exist."})
  }

  res.status(200).json(workout)
}

// create a single workout
const createSingleWorkout = async (req,res)=>{
  const {title,reps,load} = req.body
  
  const emptyFields = []

  if(!title){
    emptyFields.push("title")
  }

  if(!reps){
    emptyFields.push("reps")
  }

  if(!load){
    emptyFields.push("load")
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: "All the fields must be filled in.", emptyFields})
  }

  try {
    const user_id = req.user._id
    const workout = await Workout.create({title,reps,load,user_id})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// update a single workout
const updateSingleWorkout = async (req,res)=>{
  const {_id} = req.params

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(400).json({error: "This is not a valid id."})
  }

  const workout = await Workout.findByIdAndUpdate({_id},{
    ...req.body
  })

  if(!workout){
    return res.status(400).json({error: "Workout doesn't exist."})
  }

  res.status(200).json(workout)
}

// delete a single workout
const deleteSingleWorkout = async (req,res)=>{
  const {_id} = req.params

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(400).json({error: "This is not a valid id."})
  }

  const workout = await Workout.findByIdAndDelete({_id})

  if(!workout){
    return res.status(400).json({error: "Workout doesn't exist."})
  }

  res.status(200).json(workout)
}

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createSingleWorkout,
  updateSingleWorkout,
  deleteSingleWorkout
}