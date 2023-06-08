import React from 'react'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'

const Signup = (props) => {
    const [credentials,setCredentials] = useState({name: "", email : "", password : "", cpassword : ""})
    let history = useHistory()
    const handleSubmit = async(e) =>{
    
        e.preventDefault()
       const  {name, email, password} = credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
             
              
            },
        
            body: JSON.stringify({name, email, password})
          })
          const json =await response.json()
          console.log(json)
          if(json.success){
              // Save the auth token and redirect
              localStorage.setItem('token',json.authtoken)
              history.push('/signin')
              props.showAlert(" Account Created Successfully ","success")
          }
          else{
            props.showAlert("Invalid Credential","danger")
          }
        
           
       
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
}
  return (
    <div className='container'>
      <h1 style={{borderBottom:'3px solid black'}}>SIGNUP HERE</h1>
      <form  onSubmit={handleSubmit}>
      <div className="form-group ">
    <label className=' my-2' htmlFor="name"><i className="fa-solid fa-user fa-2xl"></i></label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={onChange} placeholder="Enter UserName"/>
   
  </div>
  <div className="form-group my-2">
    <label className=' my-2' htmlFor="email"><i className="fa-solid fa-envelope fa-2xl"></i></label>
    <input type="email" className="form-control" id="email" name='email'  aria-describedby="emailHelp"  onChange={onChange} minLength={5} required placeholder="Enter email"/>
    
  </div>
  <div className="form-group my-2">
    <label className=' my-2' htmlFor="Password"><i className="fa-solid fa-lock fa-2xl"></i></label>
    <input type="password" className="form-control" name='password' id="password"  onChange={onChange} minLength={5} required placeholder="Password"/>
  </div>
  <div className="form-group my-2">
    <label className=' my-2' htmlFor="CPassword"><i className="fa-solid fa-lock fa-2xl"></i></label>
    <input type="password" className="form-control" name='cpassword' id="password" placeholder="Confirm Password"/>
  </div>
  <button type="submit" className="btn btn-dark" onSubmit={handleSubmit}>Submit</button>
</form>
    </div>
  )
}

export default Signup
