const express = require("express")
const workoutsRouter = express.Router()
const {
        getAllWorkouts,
        getSingleWorkout,
        createWorkout,
        updateWorkout,
        deleteWorkout
      } = require("../controllers/workoutsControllers")

const requireAuth = require("../middleware/requireAuth")

// middleware
workoutsRouter.use(requireAuth)

// Get all the workouts
workoutsRouter.get("/", getAllWorkouts)

// Get a single workout
workoutsRouter.get("/:_id", getSingleWorkout)

// Create a single workout
workoutsRouter.post("/", createWorkout)

// Update a single workout
workoutsRouter.patch("/:_id", updateWorkout)

// Delete a single workout
workoutsRouter.delete("/:_id", deleteWorkout)

module.exports = workoutsRouter