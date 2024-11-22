import {useState} from "react"

export const useLogin = ()=>{
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

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

    const json = await response.json()

    if(!response.ok){
      setIsLoading(false)
      setError(json.error)
    }

    if(response.ok){
      setError(null)
      setIsLoading(false)
      localStorage.setItem("user",JSON.stringify(json))
      console.log("user login.");
      
    }
  }
  return {login,error,isLoading}
}