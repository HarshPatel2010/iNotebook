// import { useState } from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  // create a state
  // const a = {
  //     "name":"context-api",
  //     "from":"NOteState.js"
  // }

  // const [state, setstate] = useState(a)
  // const update = ()=>{

  //     setTimeout(() => {
  //         setstate({
  //             "name":"state has been Changed",
  //             "from":"Harsh Patel's iNotebook"
  //         })
  //     }, 1000);
  // }

  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // get all note
  const getNotes = async () => {
    //API call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTYxZThlNDE5NzE5ZWQ5ZGU5M2ZiIn0sImlhdCI6MTY0NDEzNzk0M30.FhOv5xPftt5LN3KrAs83XMPYtakMZpGZPRbXK7T5yMQ",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch("http://localhost:5000/api/notes/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTYxZThlNDE5NzE5ZWQ5ZGU5M2ZiIn0sImlhdCI6MTY0NDEzNzk0M30.FhOv5xPftt5LN3KrAs83XMPYtakMZpGZPRbXK7T5yMQ",
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    console.log(note);
    setNotes(notes.concat(note));
    
  };

  // Delete a anote
  const deleteNote = async (id) => {
    //API call
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTYxZThlNDE5NzE5ZWQ5ZGU5M2ZiIn0sImlhdCI6MTY0NDEzNzk0M30.FhOv5xPftt5LN3KrAs83XMPYtakMZpGZPRbXK7T5yMQ",
      }
    });
    const json = response.json;
    console.log(json);
    

    console.log("deleting the note with id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTYxZThlNDE5NzE5ZWQ5ZGU5M2ZiIn0sImlhdCI6MTY0NDEzNzk0M30.FhOv5xPftt5LN3KrAs83XMPYtakMZpGZPRbXK7T5yMQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic for deleting the notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
