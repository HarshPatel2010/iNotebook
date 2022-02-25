import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../CONTEXT/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const [note, setNote] = useState({id:'',etitle:"",edescription:"",etag:""})
  useEffect(() => {
    getNotes()
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }

  const handleClick = (e)=>{
    e.preventDefault();
    console.log('updating the note', note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();

    
}
const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}

  // const { notes, addNote } = context;
  return (
    <div>
      <AddNote />

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" minLength={5} required className="form-control" id="etitle" value={note.etitle} name="etitle" onChange={onChange} aria-describedby="emailHelp" />
                  <div id="emailHelp" className="form-text">Your notes are secured on cloud</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" minLength={5} required className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">tag</label>
                  <input type="text" minLength={5} required className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>add</button>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  disabled={note.etitle.length <5 || note.edescription.length <5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length ===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </div>
  )
}

export default Notes