import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/notes";

function NoteInput({ activeFolder, onNoteAdded }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addNote = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const newNote = {
        text: input,
        folder: activeFolder,
        timestamp: new Date().toISOString(),
      };
      await axios.post(`${API_URL}/create`, newNote);

      setInput("");
      if (onNoteAdded) onNoteAdded(); // 👈 notify parent to refresh list
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
