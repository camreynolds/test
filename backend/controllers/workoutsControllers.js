// Get all the workouts
const getAllWorkouts = (req,res) =>{
  res.status(200).json({mssg: "get all the workouts"})
}

// Get a single workout
const getSingleWorkout = (req,res)=>{
  res.status(200).json({mssg: "get a single workout."})
}

// Create a single workout
const createWorkout = (req,res)=>{
  res.status(200).json({mssg: "create a single workout."})
}

// Update a single workout
const updateWorkout = (req,res)=>{
  res.status(200).json({mssg: "update a single workout."})
}

// Delete a single workout
const deleteWorkout = (req,res)=>{
  res.status(200).json({mssg: "delete a single workout."})
}

module.exports = {getAllWorkouts,getSingleWorkout,createWorkout,updateWorkout,deleteWorkout}