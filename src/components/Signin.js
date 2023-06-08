import React from 'react'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'

const Signin = (props) => {
    const [credentials,setCredentials] = useState({email : "", password : ""})
    let history = useHistory()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
             
              
            },
        
            body: JSON.stringify({email : credentials.email,password : credentials.password})
          })
          const json =await response.json()
          console.log(json)
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert(" Signed Successfully ","success")
            history.push('/')
           
          }
          else{
            props.showAlert("Invalid Details","danger")
          }
            
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
}
  return (
    <div className='container'>
      <h1 style={{borderBottom:'3px solid black'}}>SIGNIN HERE</h1>
      <form onSubmit={handleSubmit} >
  <div className="form-group my-2">
    <label className=' my-2' htmlFor="email"><i className="fa-solid fa-envelope fa-2xl"></i></label>
    <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group my-2">
    <label className=' my-2' htmlFor="password"><i className="fa-solid fa-lock fa-2xl"></i></label>
    <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password} id="password" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-dark my-2" >Signin</button>
</form>
    </div>
  )
}

export default Signin
