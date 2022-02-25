import React,{useState,useContext} from 'react';
import noteContext from '../CONTEXT/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note);
        setNote({title:"",description:"",tag:""});
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    return (
        <div className="container my-3">
            <h1>add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text"  minLength={5} required className="form-control" id="title" value={note.title} name="title" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Your notes are secured on cloud</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" minLength={5} required className="form-control" id="description" value={note.description} name="description"  onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" minLength={5} required className="form-control" id="tag" name="tag" value={note.tag}  onChange={onChange} />
                </div>
                <button disabled={note.title.length <5 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleClick}>add</button>
            </form>
        </div>
    )
}

export default AddNote