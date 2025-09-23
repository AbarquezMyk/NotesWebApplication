import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/notes";

function NoteList({ activeFolder, search, refresh }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/read`);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Re-fetch when component mounts OR refresh changes
  useEffect(() => {
    fetchNotes();
  }, [refresh]);

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const filteredNotes = notes.filter(
    (note) =>
      (activeFolder === "All Notes" || note.folder === activeFolder) &&
      note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="note-list">
      {filteredNotes.length === 0 ? (
        <p className="empty">No notes found.</p>
      ) : (
        filteredNotes.map((note, index) => (
          <div className="note-card" key={note.id || index}>
            <div>
              <p>{note.text}</p>
              <span className="timestamp">{note.timestamp}</span>
            </div>
            <button onClick={() => deleteNote(index)}>🗑</button>
          </div>
        ))
      )}
    </section>
  );
}

export default NoteList;
