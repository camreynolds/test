import useUserContext from "./hooks/useAuthContext"
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  const {user} = useUserContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login" />} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/" />} />
            <Route path="/login"  element={!user ? <Login/> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;