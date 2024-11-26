import { useContext } from "react"
import { WorkoutsContext } from "../contexts/WorkoutsContext"

const useWorkoutsContext = ()=>{
  const context = useContext(WorkoutsContext)

  if(!context){
    throw Error("WorkoutContext must be use inside a WorkoutContextProvider")
  }

  return context
}

export default useWorkoutsContext