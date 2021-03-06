import React,{useContext} from 'react';
import noteContext from '../CONTEXT/notes/noteContext';


const NoteItem = (props) => {
    const {showAlert} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note,updateNote } = props;


    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
            
                    <div className="card-body ">
                      <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);showAlert("Deleted Successfully","Success");} } ></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);showAlert("Updated Successfully","Success");}}></i>
                      </div>
                      <p className="card-text">{note.description}</p>
                      
                    </div>
            </div>
        </div>
    )
}

export default NoteItem