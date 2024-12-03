import useWorkoutsContext from "../hooks/useWorkoutsContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import useAuthContext from "../hooks/useAuthContext"

const WorkoutDetails = ({w})=>{
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  const handleClick = async ()=>{
    const response = await fetch("/api/workouts/" + w._id,{
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type: "DELETE_WORKOUT", payload:json})
      console.log("workout deleted:",json)
    }
  }

  return(
    <div className="workout-details">
      <p>{w.title}</p>
      <p><strong>Load (Kg): </strong>{w.load}</p>
      <p><strong>Reps: </strong>{w.reps}</p>
      <p>{formatDistanceToNow(new Date(w.createdAt),{addSuffix: true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails