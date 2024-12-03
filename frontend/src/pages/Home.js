import {useEffect} from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import useWorkoutsContext from "../hooks/useWorkoutsContext"
import useAuthContext from "../hooks/useAuthContext"

const Home = ()=>{
  const {workouts,dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()  

  useEffect( ()=>{

    const fetchWorkouts = async ()=>{
      const response = await fetch("/api/workouts",{
        method: "GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${user.token}`}
      })      
      const json = await response.json()

      if(response.ok){
        dispatch({type: "SET_WORKOUTS", payload: json})
      }
    }

    if(user){
      fetchWorkouts()
    }

  },[dispatch,user])

  return(
    <div className="home">
      <div className="workouts">
        { workouts && workouts.map( w => (
          <WorkoutDetails key={w._id} w={w} />
        ))}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home