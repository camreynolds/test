import {useState} from "react"

export const useSignup = ()=>{
  const [error, setError] = useState(null)
  const [isLoading,setIsLoading] = useState(false)

  const signup = async (email,password)=>{
    setError(null)
    setIsLoading(true)

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
      console.log("User signed up:", json)
    }
  }

  return {signup,error,isLoading}
}