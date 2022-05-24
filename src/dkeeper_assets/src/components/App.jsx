import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dkeeper} from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function newNote(note) {
    setNotes((prevNotes) => {
      dkeeper.createNote(note.title,note.content);
      return [note,...prevNotes];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      dkeeper.deleteNote(id);
      return prevNotes.filter((note, index) => {
        return index !== id;
      });
    });
  }

  useEffect(()=>{
    console.log("useEffect is triggered");
    fetchData();
  },[]);

  async function fetchData(){
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={newNote} />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          deleteNote={deleteNote}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
