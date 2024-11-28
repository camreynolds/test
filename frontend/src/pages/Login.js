import {useLogin} from "../hooks/useLogin"
import {useState} from "react"

const Login = ()=>{
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {login,error,isLoading} = useLogin()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await login(email,password)
  }

  return(
    <form className="login" onSubmit={handleSubmit}>

      <h3>Login</h3>

      <label>email</label>
      <input 
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />

      <label>password</label>
      <input 
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>log in</button>
      {error && <div className="error">{error}</div> }
    </form>
  )
}

export default Login