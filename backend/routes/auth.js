const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body ,validationResult} = require('express-validator')

const JWT_SECRET = 'Srikanthisagoodb@oy'

// ROUTE-1 Create a  User using  POST /api/auth/createuser 
router.post('/createuser',[
    body('name','Enter a Valid name').isLength({ min: 3 }),
    body('email','Enter a Valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 })
    
  ],async (req,res)=>{
    let success = false
    // if there are error ,return bad request and the error
   const errors = validationResult(req)
   if(!errors.isEmpty()){
    return res.status(400).json({success,errors: errors.array()})
   }
   
   try{
    // check whether the email is already exits
   let user = await User.findOne({email : req.body.email})
  
   if(user){
    return res.status(404).json({success,error : 'Sorry, already mail existed'})
   }
   const salt = await bcrypt.genSalt(10)
   secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
    name : req.body.name,
    email : req.body.email,
    password : secPass
   })
   const data={
    user : {
      id : user.id
    }
   }
   const authtoken = jwt.sign(data,JWT_SECRET)
   success = true
   res.json({success,authtoken})
   //.then(user=>res.json(user))
   //.catch(err=> {console.log(err)
    //res.json({error : 'Please Enter Unique Id',message : err.message})})
   //res.send(req.body)
   //res.json(user)
   // Catch statement
  }catch(error){
    console.error(error.message)
    res.status(500).send("Some Error Occured")
  }
})

//ROUTE-2 Authenticate User using POST/api/auth/login 
router.post('/login',[
  
  body('email','Enter a Valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
  
  
],async (req,res)=>{
  let success = false
  const errors = validationResult(req)
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const {email,password} = req.body
  try {
    let user = await User.findOne({email})
    if(!user){
      success=false
      return res.status(404).json({success, error : 'Login failed, Please Enter valid email'})
    }
    const passwordCompare = await  bcrypt.compare(password, user.password)
    if(!passwordCompare){
      success=false
      return res.status(404).json({success, error : 'Login failed, Please Enter valid Password'})
    }
    const data={
      user : {
        id : user.id
      }
     }
     const authtoken = jwt.sign(data,JWT_SECRET)
     success =true
     res.json({success,authtoken})



  } catch(error){
    console.error(error.message)
    res.status(500).send("Internal Server Error")
  }
})
//ROUTE-3 Get loggedin User Details POST /api/auth/getuser
router.post('/getuser',fetchuser,async (req,res)=>{
try {
  userId = req.user.id
  const user = await User.findById(userId).select('-password') /// -password = Except password to display
  res.send(user)
} catch(error){
  console.error(error.message)
  res.status(500).send("Internal Server Error")
}
})

module.exports = router