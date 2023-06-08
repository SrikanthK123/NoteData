const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook'

mongoose.set('strictQuery',true)
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
       console.log("Successfully Connected")
       
    })
}
module.exports = connectToMongo;
