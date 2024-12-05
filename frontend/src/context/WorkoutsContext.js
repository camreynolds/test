import {createContext, useReducer} from "react"

export const WorkoutsContext = createContext()

export const workoutsReducer = (state,action)=>{
  switch(action.type){
    case "SET-WORKOUTS":
      return{
        workouts: action.payload
      }

    case "CREATE-WORKOUT":
      return{
        workouts: [action.payload, ...state.workouts]
      }

    case "DELETE-WORKOUT":
      return{
        workouts: state.workouts.filter( w => w._id !== action.payload._id)
      }

    default:
      return state
  }
}

export const WorkoutsContextProvider = ({children})=>{
  const [state,dispatch] = useReducer(workoutsReducer,{
    workouts: null
  })

  console.log("Workout context state:",state)
  

  return(
    <WorkoutsContext.Provider value={{...state,dispatch}}>
      {children}
    </WorkoutsContext.Provider>
  )
}