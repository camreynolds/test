import {useState} from "react"

export const useLogin = ()=>{
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(null)

  const login = async (email,password)=>{
    setIsLoading(true)
    setError(null)

    const response = await fetch("/api/user/login",{
      method: "POST",
      body: JSON.stringify({email,password}),
      headers:{
        "Content-Type":"application/json"
      }
    })

    const json = await response.json()

    if(!response.ok){
      setError(json.error)
      setIsLoading(false)
    }

    if(response.ok){
      setIsLoading(false)
      setError(null)
      localStorage.setItem("user", JSON.stringify(json))
      console.log("user logged in.",json)      
    }
  }
  return {login,error,isLoading}
}