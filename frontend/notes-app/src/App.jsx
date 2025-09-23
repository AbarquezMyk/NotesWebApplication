import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState("All Notes");

  const folders = ["All Notes", "School", "Personal", "Ideas"];

  const addNote = () => {
    if (input.trim()) {
      const newNote = {
        text: input,
        folder: activeFolder,
        timestamp: new Date().toLocaleString(),
      };
      setNotes([newNote, ...notes]);
      setInput("");
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const filteredNotes = notes.filter(
    (note) =>
      (activeFolder === "All Notes" || note.folder === activeFolder) &&
      note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-wrapper">
      <Sidebar
        folders={folders}
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
      />

      <main className="main-content">
        <Header activeFolder={activeFolder} search={search} setSearch={setSearch} />
        <NoteInput input={input} setInput={setInput} addNote={addNote} />
        <NoteList notes={filteredNotes} deleteNote={deleteNote} />
      </main>
    </div>
  );
}

export default App;
