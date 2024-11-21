import {useState} from "react"
import useWorkoutContext from "../hooks/useWorkoutContext"

const WorkoutForm = ()=>{
  const [title,setTitle] = useState("")
  const [reps,setReps] = useState("")
  const [load,setLoad] = useState("")
  const [error,setError] = useState(null)
  const {dispatch} = useWorkoutContext()
  const [isEmpty,setisEmpty] = useState([])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    const response = await fetch("/api/workouts",{
      method:"POST",
      body: JSON.stringify({title,reps,load}),
      headers:{
        "Content-Type":"application/json"
      }
    })

    console.log(response)
    
    const json = await response.json()

    console.log(json)    

    if(!response.ok){
      setError(json.error)
      setisEmpty(json.isEmpty)
    }

    if(response.ok){
      setError(null)
      setTitle("")
      setReps("")
      setLoad("")
      setisEmpty([])
      console.log("Workout added.")
      dispatch({type:"CREATE-WORKOUT",payload:json})
    }
  }

  return(
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>Excersize title:</label>
      <input 
        type="text"
        onChange={e => setTitle(e.target.value)}
        value={title}
        className={isEmpty.includes("title") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={e => setReps(e.target.value)}
        value={reps}
        className={isEmpty.includes("reps") ? "error" : ""}
      />

      <label>Load (Kg):</label>
      <input
        type="number"
        onChange={e => setLoad(e.target.value)}
        value={load}
        className={isEmpty.includes("load") ? "error" : ""}
      />

      <button>Add workout</button>
      {error && <div className="error">{error}</div> }
    </form>
  )
}

export default WorkoutForm