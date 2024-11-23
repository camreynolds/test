const express = require("express")
const router = express.Router()
const {
  getAllWorkouts,
  getSingleWorkout,
  createSingleWorkout,
  updateWorkout,
  deleteWorkout
} = require("../controllers/workoutControllers")
const requireAuth = require("../middleware/requireAuth")

// router.use(requireAuth)

// Get all the workouts
router.get("/",getAllWorkouts)

// Get a single workout
router.get("/:_id", getSingleWorkout)

// Create a single workout
router.post("/", createSingleWorkout)

// Update a single workout
router.patch("/:_id", updateWorkout)

// Delete a single workout
router.delete("/:_id", deleteWorkout)

module.exports = router