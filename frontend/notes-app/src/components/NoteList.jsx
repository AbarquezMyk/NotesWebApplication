import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/notes";

function NoteList({ activeFolder, search, refresh }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch notes from backend
  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/read`);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [refresh]);

  // Delete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
      setError("Failed to delete note. Please try again.");
    }
  };

  // Start editing a note
  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  // Save edited note
  const saveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { text: editText });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, text: editText } : note
        )
      );
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("Failed to edit note:", err);
      setError("Failed to edit note. Please try again.");
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      (activeFolder === "All Notes" || note.folder === activeFolder) &&
      note.text.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="note-list">
      {filteredNotes.length === 0 ? (
        <p className="empty">No notes found.</p>
      ) : (
        filteredNotes.map((note) => (
          <div className="note-card" key={note.id}>
            <div className="note-info">
              <span
                className={`note-folder folder-${note.folder
                  .replace(" ", "")
                  .toLowerCase()}`}
              >
                {note.folder}
              </span>

              {editingId === note.id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(note.id)}>💾 Save</button>
                  <button onClick={() => setEditingId(null)}>❌ Cancel</button>
                </>
              ) : (
                <>
                  <p>{note.text}</p>
                  <span className="timestamp">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {editingId !== note.id && (
              <div className="note-actions">
                <button onClick={() => startEdit(note)}>✏️</button>
                <button onClick={() => deleteNote(note.id)}>🗑</button>
              </div>
            )}
          </div>
        ))
      )}
    </section>
  );
}

export default NoteList;
