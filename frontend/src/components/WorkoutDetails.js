import useWorkoutContext from "../hooks/useWorkoutContext"
import useAuthContext from "../hooks/useAuthContext"
import {formatDistanceToNow} from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({w})=>{
  const {dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  const handleClick = async()=>{
    if(!user){
      return
    }

    const response = await fetch("/api/workouts/" + w._id,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    dispatch({type:"DELETE-WORKOUT", payload:json})
    
    console.log("workout deleted.")
  }

  return(
    <div className="workout-details">
      <h4>{w.title}</h4>
      <p><strong>Reps:</strong> {w.reps}</p>
      <p><strong>Load (Kg):</strong> {w.load}</p>
      <p>{formatDistanceToNow(new Date(w.createdAt),{addSuffix:true}) }</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails