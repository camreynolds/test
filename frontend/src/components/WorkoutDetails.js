import {formatDistanceToNow} from "date-fns/formatDistanceToNow"
import useWorkoutContext from "../hooks/useWorkoutContext"

const WorkoutDetails = ({w})=>{
  const {dispatch} = useWorkoutContext()

  const handleClick = async()=>{
    const response = await fetch("/api/workouts/" + w._id,{
      method:"DELETE"
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