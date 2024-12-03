import useAuthContext from "../hooks/useAuthContext"
import useWorkoutsContext from "../hooks/useWorkoutsContext"

export const useLogout = ()=>{
  const {dispatch} = useAuthContext()
  const {dispatch: workoutsDispatch} = useWorkoutsContext()

  const logout = ()=>{
    dispatch({type: "LOGOUT"})
    workoutsDispatch({type: "SET_WORKOUTS", payload: null})
    localStorage.removeItem("user")
  }

  return {logout}
}