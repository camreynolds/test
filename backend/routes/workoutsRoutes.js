const express = require("express")
const workoutsRoutes = express.Router()
const {
  getAllWorkouts,
  getSingleWorkout,
  createSingleWorkout,
  updateSingleWorkout,
  deleteSingleWorkout
} = require("../controllers/workoutsControllers")

// get all the workouts
workoutsRoutes.get("/", getAllWorkouts)

// get a single workout
workoutsRoutes.get("/:_id", getSingleWorkout)

// create a single workout
workoutsRoutes.post("/", createSingleWorkout)

// update a single workout
workoutsRoutes.patch("/:_id", updateSingleWorkout)

// delete a single workout
workoutsRoutes.delete("/:_id", deleteSingleWorkout)

module.exports = workoutsRoutes