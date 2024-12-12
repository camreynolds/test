import { useState } from "react"

// useAuthContext hook
import useAuthContext from "../hooks/useAuthContext"

export const useLogin = ()=>{
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const {dispatch} = useAuthContext()

  const login = async (email,password)=>{
    setError(null)
    setIsLoading(true)

    const response = await fetch("/api/user/login",{
      method: "POST",
      body: JSON.stringify({email,password}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    console.log("response:",response)
    
    const json = await response.json()
    console.log("json:",json)
    

    if(!response.ok){
      setError(json.error)
      setIsLoading(false)
    }

    if(response.ok){
      setError(null)
      setIsLoading(false)
      dispatch({type: "LOGIN", payload: json})
      localStorage.setItem("user",JSON.stringify(json))
      console.log("user logged in:",json)
    }
  }

  return {login,error,isLoading}
}