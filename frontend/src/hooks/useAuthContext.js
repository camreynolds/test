import { useContext } from "react"

// AuthContext
import { AuthContext } from "../context/AuthContext"

const useAuthContext = ()=>{
  const context = useContext(AuthContext)

  if(!context){
    throw Error("AuthContext must be used inside an AuthContextProvider.")
  }

  return context
}

export default useAuthContext