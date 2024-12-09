import {Link} from "react-router-dom"

const handleClick = ()=>{
  console.log("user logged out")
  localStorage.removeItem("user")
}

const Navbar = ()=>{
  return(
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleClick}>logout</button>
          </div>
          <div>
            <Link to="/login">login</Link>
            <Link to="/signup">signup</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar