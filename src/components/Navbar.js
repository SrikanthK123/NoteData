
import {
  Link,
  useLocation,
  useHistory
} from "react-router-dom";



const Navbar = () => {
  let location = useLocation();
  let history = useHistory()
  const handleSignout = ()=>{
    localStorage.removeItem('token')
    history.push('/signin')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active" : ""}`}aria-current="page" to="/">Lobby</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active" : ""}`} to="/about">About-Us</Link>
        </li>
        
         
      </ul>
      {!localStorage.getItem('token')?<form className='d-flex'>
      <Link className="btn btn-dark mx-2 my-1" style={{border : "2px solid white" }} to="/signin"  role="button">Signin</Link>
      <Link className="btn btn-dark mx-2 my-1" style={{border : "2px solid white" }} to="/signup" role="button">Signup</Link>
      </form>: <button onClick={handleSignout} className='btn btn-dark' style={{border: '2px solid white'}}>SignOut</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
