import React, { useState, useEffect, useRef } from "react";
import AddNoteModal from "./AddNoteModal";
import StatusModal from "../StatusModal";
import SendFundsModal from "./SendFundsModal";
import { FiEdit, FiTrash2, FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import "./Notes.css";
import noteCardImg from "../../assets/imgs/notecard.png";
import Settings from "./Settings";

function Notes({ user }) {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editText, setEditText] = useState("");
  const [focusedNote, setFocusedNote] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusConfirm, setStatusConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [sendFundsVisible, setSendFundsVisible] = useState(false);
  const leftPageRef = useRef(null);
  const hiddenRef = useRef(null);

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
      await fetch(`http://localhost:8080/api/notes/${noteToDelete.id}`, {
        method: "DELETE",
      });
      setNotes((prev) => prev.filter((n) => n.id !== noteToDelete.id));
      setFocusedNote(null);
      setNoteToDelete(null);
      setStatusMessage("Note deleted!");
      setStatusConfirm(false);
    } catch (err) {
      console.error("Delete failed:", err);
      setStatusMessage("Delete failed");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/notes/read");
      if (!res.ok) {
        triggerStatus("Failed to fetch notes");
        return;
      }
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      triggerStatus("Failed to fetch notes");
    }
  };

  const filteredNotes = notes.filter((note) => {
    const text = (note?.text || "").toLowerCase();
    const title = (note?.title || "").toLowerCase();
    const searchLower = search.toLowerCase();
    return text.includes(searchLower) || title.includes(searchLower);
  });

  const handleAddNote = async () => {
    if (!newNoteTitle.trim() || !newNoteText.trim()) {
      triggerStatus("Missing fields");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/notes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newNoteTitle, text: newNoteText }),
      });
      const savedNote = await res.json();
      setNotes((prev) => [...prev, savedNote]);
      triggerStatus("Note added!");
      setNewNoteTitle("");
      setNewNoteText("");
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to add note:", err);
      triggerStatus("Add failed");
    }
  };

  const handleEdit = (note) => {
    setEditingNoteId(note.id);
    setEditText(note.text || "");
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const res = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      });
      const updatedNote = await res.json();
      setNotes((prev) => prev.map((n) => (n.id === id ? updatedNote : n)));
      setEditingNoteId(null);
      setEditText("");
      setFocusedNote(updatedNote);
      triggerStatus("Note updated!");
    } catch (err) {
      console.error("Failed to update note:", err);
      triggerStatus("Update failed");
    }
  };

  const splitTextDynamic = (text) => {
    if (!leftPageRef.current || !hiddenRef.current)
      return { left: text, right: "" };

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

  let left = "";
  let right = "";

  if (focusedNote) {
    const actualText =
      editingNoteId === focusedNote.id ? editText : focusedNote.text || "";
    if (leftPageRef.current && hiddenRef.current) {
      const parts = splitTextDynamic(actualText);
      left = parts.left;
      right = parts.right;
    } else {
      left = actualText;
    }
  }

  return (
    <div className="notes-container">
      <div
        className="search-settings-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <div className="search-bar-wrapper" style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Settings />
      </div>

      <div className="folders">
        <div className="add-note-btn" onClick={() => setShowAddModal(true)}>
          <div className="add-circle">+</div>
          <span>Add New Note</span>
        </div>
      </div>

      <div className="note-list">
  {filteredNotes.length === 0 ? (
    <div className="empty">No notes found.</div>
  ) : (
    filteredNotes.map((note) => (
      <div
        key={note.id}
        className="note-card"
        onClick={() => setFocusedNote(note)}
        style={{
          backgroundImage: `url(${noteCardImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
          fontWeight: "600",
          textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        }}
      >
        <div className="note-folder">All</div>

        {/*  UPDATED NOTE INFO  */}
        <div className="note-info">

          {/* TITLE  */}
          <div
  style={{
    fontSize: "22px",
    fontWeight: "700",
    color: "#564934ff", // dark color for readability
    padding: "8px 12px",
    borderRadius: "6px 6px 0 0", // rounded top corners only
    boxShadow: "0 2px 4px rgba(255, 255, 255, 0.2)", // slight depth
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    marginBottom: "8px",
  }}
>
  {note.title || "Untitled Note"}
</div>

          {/*  PREVIEW  */}
          <div
            className="note-card-content"
            style={{ marginBottom: "10px" }}
          >
            {(note.text || "").slice(0, 120)}
            {note.text?.length > 120 ? "..." : ""}
          </div>

          {/*  SIGNED + TIMESTAMP ROW  */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              marginTop: "5px",
            }}
          >
            {/* Auto-sign badge */}
            {note.signed ? (
              <span
                style={{
                  background: "#4CAF50",
                  padding: "3px 6px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                ✓ Signed
              </span>
            ) : (
              <span
              style={{
          background: "rgba(193, 74, 74, 0.15)",
           color: "#C14A4A",
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "11px",
          fontWeight: "600",
          border: "1px solid rgba(193,74,74,0.25)",
          }}
          >  
           Unsigned
            </span>
            )}

            {/* Timestamp */}
            <span
  style={{
    display: "inline-block",
    fontSize: "11px",
    color: "#947044ff",               // muted text color
    background: "#E0E0E0",       // soft gray capsule
    padding: "3px 8px",
    borderRadius: "12px",        // pill shape
    fontWeight: "500",
    fontFamily: "monospace",     // gives a “techy / precise” look
    letterSpacing: "0.5px",
  }}
>
  {new Date(note.timestamp).toLocaleString()}
</span>
          </div>
        </div>
      </div>
    ))
  )}
</div>

      {/* FOCUSED NOTE OVERLAY */}
      {focusedNote && (
        <>
          <div className="overlay-backdrop" onClick={() => setFocusedNote(null)} />

          <div className="note-card-overlay notebook-overlay">
            <button className="close-btn" onClick={() => setFocusedNote(null)}>
              <FiX size={20} />
            </button>

            <div className="notebook-content-wrapper">
              <h2 className="zoom-note-title">{focusedNote.title}</h2>
              <div className="zoom-note-folder">All</div>

              <div className="zoom-note-actions">
                {editingNoteId === focusedNote.id ? (
                  <>
                    <button className="edit-btn" onClick={() => handleSaveEdit(focusedNote.id)}>
                      <FiSave size={18} />
                    </button>

                    <button
                      className="back-btn"
                      onClick={() => setEditingNoteId(null)}
                    >
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

                    {/*  TIP BUTTON  */}
                    <button
                    
                      className="tip-btn"
                      style={{
                        background: "#A1866F",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSendFundsVisible(true);
                      }}
                    >
                      Add Tip 💰
                    </button>
                  </>

                )}  
              </div>

              {/* FIXED JSX BLOCK */}
              <div className="zoom-note-content">
                <div className="left-page" ref={leftPageRef}>
                  {editingNoteId === focusedNote.id ? (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="note-edit-textarea"
                    />
                  ) : (
                    <div>{left}</div>
                  )}
                </div>

                {right && (
                  <div className="right-page">
                    <div>{right}</div>
                  </div>
                )}
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
        noteCategory={null}
        setNoteCategory={() => {}}
        categories={[]}
      />

      <StatusModal
        show={showStatus}
        message={statusMessage}
        onClose={() => setShowStatus(false)}
        showButtons={statusConfirm}
        onConfirm={confirmDelete}
      />

      <SendFundsModal
        visible={sendFundsVisible}
        onClose={() => setSendFundsVisible(false)}
        walletAddress={user?.walletAddress || ""}
        receiverWallet={focusedNote?.walletAddress || ""}
        noteId={focusedNote?.id}
      />
    </div>
  );
}

export default Notes;