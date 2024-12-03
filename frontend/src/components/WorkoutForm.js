import {useState} from "react"
import useWorkoutsContext from "../hooks/useWorkoutsContext"
import useAuthContext from "../hooks/useAuthContext"

const WorkoutForm = ()=>{
  const [title,setTitle] = useState("")
  const [load,setLoad] = useState("")
  const [reps,setReps] = useState("")
  const [error,setError] = useState(null)
  const {dispatch} = useWorkoutsContext()
  const [emptyFields, setEmptyFields] = useState([])
  const {user} = useAuthContext()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const response = await fetch("/api/workouts",{
      method: "POST",
      body: JSON.stringify({title,load,reps}),
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if(response.ok){
      setTitle("")
      setLoad("")
      setReps("")
      setError(null)
      dispatch({type:"CREATE_WORKOUT", payload:json})
      console.log("workout added:",json)
      setEmptyFields([])
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
        className={ emptyFields.includes("title") ? "error" : " "}
      />

      <label>Load (Kg):</label>
      <input
        type="number"
        onChange = { e => setLoad(e.target.value)}
        value={load}
        className={ emptyFields.includes("load") ? "error" : " "}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={ e => setReps(e.target.value)}
        value={reps}
        className={ emptyFields.includes("reps") ? "error" : " "}
      />

      <button>add workout</button>
      { error && <div className="error">{error}</div> }
    </form>
  )
}

export default WorkoutForm