import { useState } from "react"
import NoteContext from "../noteContext"

const NoteState = (props)=>{
  const host = "http://localhost:5000"
  /*  const s1 = {
        "name" : "srikanth",
        "class" : "5b"
    }
    const [state,setState] = useState(s1)
    const update = ()=>{
        setTimeout(() => {
                setState(
                    {
                        "name" : "Avyay Krishna",
                        "class" : "5a"
                    }
                )
        },2000)
    }*/
    const notesInit =[ ]
      const [notes,setNotes] = useState(notesInit)

       //Get a  Note
       const getNotes = async ()=>{
        // TODO Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
            
          }
        })
        const json = await response.json()
        console.log(json)
        setNotes(json)
      }
      // Add a Note
      const addNote = async (title,description,tag)=>{
        // TODO Api call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
            
          },
        
          body: JSON.stringify({title,description,tag})
        })
        const json =  response.json(); 
        console.log(json)
        console.log("Adding a new note")
       const  note = {
            "_id": "646f2fd81e898fe42f28fca5b",
            "user": "646c9a4ea94f6fc28c87fdc3",
            "title": title,
            "description": description,
            "tag":tag,
            "date": "2023-05-25T09:52:24.047Z",
            "__v": 0
          }
        setNotes(notes.concat(note))
        
      }

      // Delete a Note
      const deleteNote = async(id)=>{
        //Api 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
            
          },
        
         
        })
        const json =  response.json(); 
        console.log(json)
        console.log("Deleted Id : " + id)
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
      }

      // Edit a Note
      const editNote = async (id,title,description,tag)=>{
        // API call

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
            
          },
        
          body: JSON.stringify({title,description,tag})
        })
        const json =  response.json();
        console.log(json) 
        
        let newNotes = JSON.parse(JSON.stringify())
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = notes[index];
          if(element._id === id ){
            newNotes[index].title = title
            newNotes[index].description = description
            newNotes[index].tag = tag
            break
          }
          
        }
        setNotes(newNotes)
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
        </NoteContext.Provider>
    )
   

}
export default NoteState