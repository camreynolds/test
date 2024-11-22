import {useState} from "react"

export const useSignup = ()=>{
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const signup = async (email,password)=>{
    setIsLoading(true)
    setError(null)

    const response = await fetch("/api/user/signup",{
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
      console.log("user created.");
    }
  }
  return {signup,isLoading,error}
}