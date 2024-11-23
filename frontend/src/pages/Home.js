// import {useEffect,useState} from "react"
import {useEffect} from "react"
import useWorkoutContext from "../hooks/useWorkoutContext"
import useAuthContext from "../hooks/useAuthContext"

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = ()=>{
  // const [workouts, setWorkouts] = useState(null)
  const {workouts,dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  
  
  useEffect( ()=>{
    console.log("Home User Effect:",user.token);
    const fetchWorkouts = async ()=>{
      const response = await fetch("/api/workouts",{
        headers:{"Authorization":`Bearer ${user.token}`}
      })
      const json = await response.json()

      if(response.ok){
        // setWorkouts(json)
        dispatch({type:"SET-WORKOUTS", payload:json})
      }
    }
    
    if(user){
      fetchWorkouts()
    }

  },[dispatch,user])

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