// import { useState,useEffect } from "react"
import { useEffect } from "react"

// Use context
import useWorkoutsContext from "../hooks/useWorkoutsContext"

// Components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = ()=>{
  // const [workouts,setWorkouts] = useState(null)
  const {workouts,dispatch} = useWorkoutsContext()

  useEffect( ()=>{

    const fectchWorkouts = async()=>{
      const response = await fetch("/api/workouts")
      const json = await response.json()
  
      if(response.ok){
        // setWorkouts(json)
        dispatch({type: "SET-WORKOUTS", payload: json})
      }
    }

    fectchWorkouts()
  },[dispatch])

  console.log("Workouts:",workouts)
  
  return(
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map( workout =>(
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home