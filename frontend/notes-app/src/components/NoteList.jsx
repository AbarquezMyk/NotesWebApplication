import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/notes";

function NoteList({ activeFolder, search, refresh }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/read`);
      setNotes(res.data);
    } catch (err) {
      setError("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [refresh]);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      setError("Failed to delete note.");
    }
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

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
      setError("Failed to edit note.");
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      (activeFolder === "All Notes" || note.folder === activeFolder) &&
      note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="note-list">
      {loading && <p>Loading notes...</p>}
      {error && <p className="error">{error}</p>}
      {filteredNotes.length === 0 && <p className="empty">No notes found.</p>}

      {filteredNotes.map((note) => (
        <div className="note-card" key={note.id}>
          <div className="note-info">
            <span className={`note-folder folder-${note.folder.replace(" ", "").toLowerCase()}`}>
              {note.folder}
            </span>

            {editingId === note.id ? (
              <>
                <textarea
                  className="note-edit-textarea"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="edit-buttons">
                  <button onClick={() => saveEdit(note.id)}>💾 Save</button>
                  <button onClick={() => setEditingId(null)}>❌ Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p>{note.text}</p>
                <span className="timestamp">{new Date(note.createdAt).toLocaleString()}</span>
              </>
            )}
          </div>

          {editingId !== note.id && (
            <div className="note-actions">
              <button onClick={() => startEdit(note)}>✏️</button>
              <button onClick={() => setConfirmDeleteId(note.id)}>🗑</button>
            </div>
          )}
        </div>
      ))}

      {/* CENTERED DELETE CONFIRMATION MODAL */}
      {confirmDeleteId && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Are you sure you want to delete this note?</p>
            <button onClick={() => deleteNote(confirmDeleteId)} className="confirm">Yes</button>
            <button onClick={() => setConfirmDeleteId(null)} className="cancel">No</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default NoteList;
