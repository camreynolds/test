import {Link} from "react-router-dom"

const Navbar = ()=>{
  return(
    <div className="container">
      <nav>
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar