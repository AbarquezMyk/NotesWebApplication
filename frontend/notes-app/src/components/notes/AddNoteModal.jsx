import React from "react";

function AddNoteModal({
  show,
  onClose,
  onAdd,
  noteTitle,
  setNoteTitle,
  noteText,
  setNoteText,
  noteFolder,
  setNoteFolder,
  categories = [],
}) {
  if (!show) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "450px",
          maxWidth: "90%",
          backgroundColor: "var(--bg-color)",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          padding: "25px 20px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <h2
          style={{
            marginBottom: "18px",
            color: "var(--primary-color)",
            fontSize: "1.5rem",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Add New Note
        </h2>

        {/* Note Title */}
        <input
          type="text"
          placeholder="Note Title"
          value={noteTitle || ""}
          onChange={(e) => setNoteTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid var(--accent-color)",
            fontSize: "1rem",
            color: "var(--text-color)",
            backgroundColor: "#fffdf8",
            boxSizing: "border-box",
          }}
        />

        {/* Note Text */}
        <textarea
          placeholder="Write your note here..."
          value={noteText || ""}
          onChange={(e) => setNoteText(e.target.value)}
          style={{
            width: "100%",
            minHeight: "150px",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid var(--accent-color)",
            fontSize: "1rem",
            color: "var(--text-color)",
            backgroundColor: "#fffdf8",
            resize: "vertical",
            boxSizing: "border-box",
            lineHeight: "1.4",
          }}
        />

        {/* Select Folder */}
        <select
          value={noteFolder || ""}
          onChange={(e) => setNoteFolder(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid var(--accent-color)",
            fontSize: "1rem",
            backgroundColor: "#fffdf8",
            color: "var(--text-color)",
            boxSizing: "border-box",
          }}
        >
          <option value="" disabled>
            Select Folder
          </option>
          {categories.filter((c) => c !== "All").map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "5px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "var(--highlight-color)",
              color: "var(--text-color)",
              padding: "9px 20px",
              borderRadius: "8px",
              border: "1px solid var(--accent-color)",
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onAdd}
            style={{
              background: "var(--primary-color)",
              color: "#fff",
              padding: "9px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.95rem",
              transition: "0.2s",
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNoteModal;
