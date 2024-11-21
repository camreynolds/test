// import {useEffect,useState} from "react"
import {useEffect} from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import useWorkoutContext from "../hooks/useWorkoutContext"

const Home = ()=>{
  // const [workouts, setWorkouts] = useState(null)
  const {workouts,dispatch} = useWorkoutContext()

  useEffect( ()=>{
    const fetchWorkouts = async ()=>{
      const response = await fetch("/api/workouts")
      const json = await response.json()

      if(response.ok){
        // setWorkouts(json)
        dispatch({type:"SET-WORKOUTS", payload:json})
      }
    }
    fetchWorkouts()
  },[dispatch])

  return(
      <div className="home">
        <div className="workouts">
          { workouts && workouts.map( w =>(
            <WorkoutDetails key={w._id} w={w} />
          ))}
        </div>
        <WorkoutForm/>
      </div>
    )
}

export default Home