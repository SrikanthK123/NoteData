import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import{useHistory} from 'react-router-dom'
const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useHistory()
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
        history.push('/signin')
    }
   
    // eslint-disable-next-line
  }, []);
  const reff = useRef(null)
  const reffClose = useRef(null)
  const [note , setNote] = useState({id:"", etitle: "", edescription: "", etag : ""})
  const updateNote = (currentNote) => {
    reff.current.click()
    setNote({id: currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag})
    
  }
 
    const handleClick=(e)=>{
      editNote(note.id,note.etitle,note.edescription,note.etag)
      reffClose.current.click()
       props.showAlert(" Updated  Successfully ","success")
        
        
    }
    const onChange = (e)=>{
            setNote({...note, [e.target.name] : e.target.value})
    }

  
  return (
    <>
      <AddNote showAlert = {props.showAlert}/>
  
<button type="button" className="btn btn-primary d-none"  ref={reff} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label"> Title  </label>
          <input type="text" className="form-control" id="etitle" name="etitle"  value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
        
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label"> Description </label>  
          <input type="text" className="form-control"  id="edescription" name="edescription" value={note.edescription} onChange={onChange}  minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> Tag </label>  
          <input type="text" className="form-control"  id="etag" name="etag" value={note.etag} onChange={onChange} />
        </div>
        <div className="mb-3 form-check">
         
          
          
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={reffClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  disabled = {note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3">
        <h2> View Your Note Here</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes are available here'}
        </div>
        {notes.map((note) => {
          return   <Noteitem key={note._id} updateNote={updateNote} showAlert = {props.showAlert} note={note} />

        })}
      </div>
    </>
  );
};

export default Notes;
