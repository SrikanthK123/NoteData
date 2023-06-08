import React,{useContext} from "react";
import noteContext from "../context/noteContext";

const Noteitem = (props) => {
const context = useContext(noteContext)
const {deleteNote} = context
  const { note, updateNote } = props;
  // eslint-disable-next-line
  return (
    <div className="col md-3">
      <div className="card my-3">
       
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert(" Deleted Note Successfully ","success");}}></i>
            <i className="fa-solid fa-pen mx-2" onClick={()=>{updateNote(note)}} ></i>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
