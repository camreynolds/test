// import { useState,useEffect } from "react"
import { useEffect } from "react"

// hooks
import useWorkoutsContext from "../hooks/useWorkoutsContext"
import useAuthContext from "../hooks/useAuthContext"

// Components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = ()=>{
  // const [workouts,setWorkouts] = useState(null)
  const {workouts,dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect( ()=>{

    const fectchWorkouts = async()=>{
      const response = await fetch("/api/workouts",{
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if(response.ok){
        // setWorkouts(json)
        dispatch({type: "SET-WORKOUTS", payload: json})
      }
    }

    if(user){
      fectchWorkouts()
    }
    
  },[dispatch,user])

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