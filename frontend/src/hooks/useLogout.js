// useWorkoutsContext & useAuthContext hooks
import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";

export const useLogout = ()=>{
  const {dispatch} = useWorkoutsContext()
  const {dispatch: authDispatch} = useAuthContext()

  const logout = ()=>{
    dispatch({type: "SET-WORKOUTS", payload: null})
    authDispatch({type: "LOGOUT"})

    localStorage.removeItem("user")
    console.log("user logged out")
  }

  return {logout}
}