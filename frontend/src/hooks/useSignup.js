import {useState} from "react"

export const useSignup = ()=>{
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(null)

  const signup = async(email,password)=>{
    setError(null)
    setIsLoading(true)

    const response = await fetch("/api/user/signup",{
      method:"POST",
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
      setError(null)
      setIsLoading(false)
      console.log("Signup function: user signed up.",json)
      localStorage.setItem("user",JSON.stringify(json))
    }
  }
  return {signup,error,isLoading}
}