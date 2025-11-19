import React, { useState, useEffect, useRef } from "react";
import AddNoteModal from "./AddNoteModal";
import StatusModal from "../StatusModal";
import { FiEdit, FiTrash2, FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import "./Notes.css";
import noteCardImg from "../../assets/imgs/notecard.png";


// -------------------- COLORS ----------------------
const COLORS = [
  "#A1866F", "#C69C6D", "#8C5E3C", "#D8C3A5", "#BFA67A",
  "#E1C699", "#9B7A55", "#7F5A40", "#B78C68", "#D4A373"
];

const getColorForCategory = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

// ==================================================
//                    MAIN NOTES
// ==================================================
function Notes({ search, setSearch }) {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteCategory, setNewNoteCategory] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editText, setEditText] = useState("");

  const [focusedNote, setFocusedNote] = useState(null);

  const leftPageRef = useRef(null);
  const hiddenRef = useRef(null);

  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusConfirm, setStatusConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const triggerStatus = (msg) => {
    setStatusMessage(msg);
    setStatusConfirm(false);
    setShowStatus(true);
  };

  const handleDeleteClick = (note) => {
    setNoteToDelete(note);
    setStatusMessage("Are you sure you want to delete this note?");
    setStatusConfirm(true);
    setShowStatus(true);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    try {
      await fetch(`http://localhost:8080/api/notes/${noteToDelete.id}`, { method: "DELETE" });
      setNotes(prev => prev.filter(n => n.id !== noteToDelete.id));
      setNoteToDelete(null);
      setFocusedNote(null);
      setStatusConfirm(false);
      setStatusMessage("Note deleted!");
    } catch (err) {
      console.error("Delete failed:", err);
      setStatusMessage("Delete failed");
    }
  };

  // Load notes & categories
  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/notes/read");

      // 🔐 Handle HTTP errors like 500 cleanly
      if (!res.ok) {
        console.error("Failed to fetch notes. HTTP", res.status);
        setNotes([]);              // keep notes as an array
        triggerStatus("Failed to fetch notes");
        return;
      }

      const data = await res.json();

      // 🔐 Make absolutely sure we save an array in state
      if (!Array.isArray(data)) {
        console.error("Notes API did not return an array:", data);
        setNotes([]);
      } else {
        setNotes(data);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setNotes([]);                // keep notes as an array
      triggerStatus("Failed to fetch notes");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/categories/read");
      if (!res.ok) {
        console.error("Failed to fetch categories. HTTP", res.status);
        setCategories([{ id: 0, name: "All" }]);
        return;
      }

      const data = await res.json();
      const normalized = Array.isArray(data) ? data : [];
      // Store categories as objects
      setCategories([{ id: 0, name: "All" }, ...normalized]);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([{ id: 0, name: "All" }]);
    }
  };

  // 🔐 Make sure we never call .filter on a non-array
  const safeNotes = Array.isArray(notes) ? notes : [];

  // FILTERED NOTES
  const filteredNotes = safeNotes.filter(
    note =>
      (!activeCategory || note?.category?.name === activeCategory) &&
      (note?.text || "").toLowerCase().includes((search || "").toLowerCase())
  );

  // ADD NOTE
  const handleAddNote = async () => {
    if (!newNoteTitle?.trim() || !newNoteText?.trim() || !newNoteCategory) {
      triggerStatus("Missing fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/notes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newNoteTitle,
          text: newNoteText,
          categoryId: newNoteCategory.id
        })
      });
      const savedNote = await res.json();

      setNotes(prev => [...prev, savedNote]);

      // Add category if not exists
      if (savedNote?.category && !categories.find(c => c.id === savedNote.category.id)) {
        setCategories(prev => [...prev, savedNote.category]);
      }

      triggerStatus("Note added!");
      setNewNoteTitle("");
      setNewNoteText("");
      setNewNoteCategory(savedNote.category); // auto-select the new category
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to add note:", err);
      triggerStatus("Add failed");
    }
  };

  // EDIT NOTE
  const handleEdit = (note) => {
    setEditingNoteId(note.id);
    setEditText(note.text);
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const res = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText })
      });
      const updatedNote = await res.json();
      setNotes(prev => prev.map(n => (n.id === id ? updatedNote : n)));
      setEditingNoteId(null);
      setEditText("");
      setFocusedNote(updatedNote);
      triggerStatus("Note updated!");
    } catch (err) {
      console.error("Failed to update note:", err);
      triggerStatus("Update failed");
    }
  };

  // NOTEBOOK PAGE SPLIT
  const splitTextDynamic = (text) => {
    if (!leftPageRef.current || !hiddenRef.current) return { left: text, right: "" };
    const words = (text || "").split(" ");
    let leftText = "";
    let rightText = "";
    hiddenRef.current.innerText = "";
    for (let word of words) {
      hiddenRef.current.innerText += word + " ";
      if (hiddenRef.current.scrollHeight > leftPageRef.current.clientHeight) {
        rightText += word + " ";
      } else {
        leftText += word + " ";
      }
    }
    return { left: leftText.trim(), right: rightText.trim() };
  };

  const { left, right } = focusedNote
    ? splitTextDynamic(editingNoteId === focusedNote.id ? editText : focusedNote.text)
    : { left: "", right: "" };

  return (
    <div className="notes-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="folders">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={activeCategory === cat.name ? "active-category" : ""}
          >
            {cat.name}
          </button>
        ))}

        <div className="add-note-btn" onClick={() => setShowAddModal(true)}>
          <div className="add-circle">+</div>
          <span>Add New Note</span>
        </div>
      </div>

      <div className="note-list">
        {filteredNotes.length === 0 ? (
          <div className="empty">No notes found.</div>
        ) : (
          filteredNotes.map(note => (
            <div
              key={note.id}
              className="note-card"
              onClick={() => setFocusedNote(note)}
              style={{
                backgroundImage: `url(${noteCardImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#2d2d2d"
              }}
            >
              <div
                className="note-folder"
                style={{ backgroundColor: getColorForCategory(note?.category?.name || "") }}
              >
                {note?.category?.name}
              </div>
              <div className="note-info">
                <div className="note-card-content">{note.text}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {focusedNote && (
        <>
          <div className="overlay-backdrop" onClick={() => setFocusedNote(null)}></div>

          <div className="note-card-overlay notebook-overlay">
            <button
              className="close-btn"
              onClick={() => setFocusedNote(null)}
              style={{
                background: "#A1866F",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "5px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={e => (e.target.style.background = "#8C5E3C")}
              onMouseLeave={e => (e.target.style.background = "#A1866F")}
            >
              <FiX size={20} />
            </button>

            <div className="notebook-content-wrapper">
              <div
                className="zoom-note-folder"
                style={{ backgroundColor: getColorForCategory(focusedNote?.category?.name || "") }}
              >
                {focusedNote?.category?.name}
              </div>

              <div className="zoom-note-actions">
                {editingNoteId === focusedNote.id ? (
                  <>
                    <button className="edit-btn" onClick={() => handleSaveEdit(focusedNote.id)}>
                      <FiSave size={18} />
                    </button>
                    <button className="back-btn" onClick={() => setEditingNoteId(null)}>
                      <FiArrowLeft size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(focusedNote)}>
                      <FiEdit size={18} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteClick(focusedNote);
                      }}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </>
                )}
              </div>

              <div className="zoom-note-content">
                <div className="left-page" ref={leftPageRef}>
                  {editingNoteId === focusedNote.id ? (
                    <textarea
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      className="note-edit-textarea"
                    />
                  ) : (
                    left
                  )}
                </div>
                {right && <div className="right-page">{right}</div>}
              </div>
            </div>

            <div ref={hiddenRef} className="hidden-measure"></div>
          </div>
        </>
      )}

      <AddNoteModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddNote}
        noteTitle={newNoteTitle}
        setNoteTitle={setNewNoteTitle}
        noteText={newNoteText}
        setNoteText={setNewNoteText}
        noteCategory={newNoteCategory}
        setNoteCategory={setNewNoteCategory}
        categories={categories.filter(c => c.id !== 0)} // exclude "All" from modal
      />

      <StatusModal
        show={showStatus}
        message={statusMessage}
        onClose={() => setShowStatus(false)}
        showButtons={statusConfirm}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Notes;