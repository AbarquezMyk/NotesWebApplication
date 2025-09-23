import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/notes";

function NoteInput({ onNoteCreated }) {
  const [input, setInput] = useState("");
  const [folder, setFolder] = useState("Personal"); // default folder
  const [loading, setLoading] = useState(false);

  const addNote = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const newNote = { text: input, folder };
      const res = await axios.post(API_URL, newNote);

      // notify parent that a note was created
      if (onNoteCreated) {
        onNoteCreated(res.data);
      }

      setInput("");
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="note-input-wrapper">
      <div className="note-input">
        <textarea
          placeholder="Start typing your note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addNote} disabled={loading}>
          {loading ? "Saving..." : "+ Add"}
        </button>
      </div>
    </section>
  );
}

export default NoteInput;
