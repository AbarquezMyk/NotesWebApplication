import React from "react";
import paperImg from "../../assets/imgs/AddNote.png";

function AddNoteModal({
  show,
  onClose,
  onAdd,
  noteTitle,
  setNoteTitle,
  noteText,
  setNoteText,
  noteCategory,
  setNoteCategory,
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
          position: "relative",
          width: "650px",
          maxWidth: "95%",
          minHeight: "550px",
          maxHeight: "90vh",
          backgroundImage: `url(${paperImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px",
          padding: "35px 30px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflowY: "auto",
          boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
        }}
      >
        {/* Header */}
        <h2
          style={{
            marginBottom: "12px",
            color: "#8C5E3C",
            fontSize: "1.8rem",
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "'Indie Flower', cursive",
            position: "relative",
          }}
        >
          Add New Note
          <span
            style={{
              display: "block",
              width: "60px",
              height: "3px",
              backgroundColor: "#B78C68",
              margin: "8px auto 0",
              borderRadius: "2px",
            }}
          />
        </h2>

        {/* Note Title */}
        <input
          type="text"
          placeholder="Note Title"
          value={noteTitle || ""}
          onChange={(e) => setNoteTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "14px",
            border: "none",
            borderBottom: "2px dashed #B78C68",
            fontSize: "1.1rem",
            color: "#4A2F1D",
            backgroundColor: "transparent",
            fontFamily: "'Indie Flower', cursive",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        {/* Note Text */}
        <textarea
          placeholder="Write your note here..."
          value={noteText || ""}
          onChange={(e) => setNoteText(e.target.value)}
          style={{
            width: "100%",
            minHeight: "180px",
            maxHeight: "320px",
            overflowY: "auto",
            padding: "10px 12px",
            marginBottom: "18px",
            border: "none",
            borderBottom: "2px dashed #B78C68",
            fontSize: "1rem",
            color: "#4A2F1D",
            backgroundColor: "transparent",
            fontFamily: "'Indie Flower', cursive",
            resize: "vertical",
            lineHeight: "1.5",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        {/* Select Category */}
        <label
          style={{
            marginBottom: "6px",
            fontWeight: "600",
            color: "#4A2F1D",
            fontFamily: "'Indie Flower', cursive",
          }}
        >
          Select Category
        </label>
        <select
          value={noteCategory?.id || ""}
          onChange={(e) => {
            const selected = categories.find(
              (c) => c.id === parseInt(e.target.value)
            );
            setNoteCategory(selected || null);
          }}
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "25px",
            border: "none",
            borderBottom: "2px dashed #B78C68",
            fontSize: "1rem",
            backgroundColor: "transparent",
            color: "#4A2F1D",
            fontFamily: "'Indie Flower', cursive",
            boxSizing: "border-box",
            outline: "none",
            appearance: "none",
          }}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories
            .filter((c) => c && c.name !== "All")
            .map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#D4A373",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontFamily: "'Indie Flower', cursive",
              transition: "0.2s",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            style={{
              backgroundColor: "#A1866F",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontFamily: "'Indie Flower', cursive",
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
