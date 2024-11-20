const express = require("express")
const router = express.Router()
const {
  getAllWorkouts,
  getSingleWorkout,
  createSingleWorkout,
  updateWorkout,
  deleteWorkout
} = require("../controllers/workoutControllers")

// Get all the workouts
router.get("/",getAllWorkouts)

// Get a single workout
router.get("/:id", getSingleWorkout)

// Create a single workout
router.post("/", createSingleWorkout)

// Update a single workout
router.patch("/:id", updateWorkout)

// Delete a single workout
router.delete("/:id", deleteWorkout)

module.exports = router