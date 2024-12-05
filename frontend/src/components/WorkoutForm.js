import {useState} from "react"

// Use context
import useWorkoutsContext from "../hooks/useWorkoutsContext"

const WorkoutForm = ()=>{
  const [title,setTitle] = useState("")
  const [load,setLoad] = useState("")
  const [reps,setReps] = useState("")
  const [error,setError] = useState(null)
  const {dispatch} = useWorkoutsContext()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const response = await fetch("/api/workouts",{
      method: "POST",
      body: JSON.stringify({title,load,reps}),
      headers:{
        "Content-Type":"application/json"
      }
    })

    const json = await response.json()

    if(!response.ok){
      setError(json.error)
    }

    if(response.ok){
      setError(null)
      setTitle("")
      setLoad("")
      setReps("")
      dispatch({type: "CREATE-WORKOUT", payload:json})
      console.log("Workout created:",json)
    }
  }

  return(
    <form className="create" onSubmit={handleSubmit}>

      <h4>New Workout</h4>

      <label>Exercise title:</label>
      <input 
        type="text"
        onChange={e => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (Kg):</label>
      <input 
        type="number"
        onChange={e => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={e => setReps(e.target.value)}
        value={reps}
      />

      <button>add Workout</button>
      {error && <div className="error">{error}</div> }
    </form>
  )
}

export default WorkoutForm