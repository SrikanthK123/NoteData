import "./App.css";
import AboutUs from "./components/AboutUs";
import Lobby from "./components/Lobby";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { useState } from "react";


function App() {
   const [alert, setAlert] = useState(null)
   const showAlert = (message,type)=>{
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
}
  return (
    <>
    <NoteState>
    <Router>
     <Navbar/>
     <Alert alert={alert}/>

     <div className="container my-3">
     <Switch > 
     <Route exact path="/"> <Lobby showAlert ={showAlert}/></Route>
     <Route exact path="/about"> <AboutUs/></Route>
     <Route exact path="/signin"> <Signin showAlert = {showAlert} /></Route>
     <Route exact path="/signup"> <Signup showAlert = {showAlert} /></Route>

     </Switch>
     
     </div>
     </Router>
     </NoteState>
    </>
  );
}

export default App;
