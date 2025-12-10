import React from "react";
import paperImg from "../../assets/imgs/ntbk.png";

function AddNoteModal({
  show,
  onClose,
  onAdd,
  noteTitle,
  setNoteTitle,
  noteText,
  setNoteText,
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
          padding: "20px 30px", // moved content higher
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflowY: "auto",
          boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
          alignItems: "flex-start",
          textAlign: "left",
        }}
      >
        {/* Header */}
        <h2
          style={{
            marginBottom: "10px",
            color: "#8C5E3C",
            fontSize: "1.4rem", // smaller
            fontWeight: "600",
            textAlign: "left",
            fontFamily: "'Indie Flower', cursive",
            position: "relative",
          }}
        >
          Create New Note
          <span
            style={{
              display: "block",
              width: "50px", // smaller underline
              height: "2px",
              backgroundColor: "#B78C68",
              marginTop: "6px",
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
            padding: "6px 10px", // smaller padding
            marginBottom: "10px",
            border: "none",
            fontSize: "0.95rem", // smaller font
            color: "#4A2F1D",
            backgroundColor: "transparent",
            fontFamily: "'Indie Flower', cursive",
            boxSizing: "border-box",
            outline: "none",
            textAlign: "left",
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
            padding: "8px 12px",
            marginBottom: "16px",
            border: "none",
            fontSize: "0.9rem",
            color: "#4A2F1D",
            backgroundColor: "transparent",
            fontFamily: "'Indie Flower', cursive",
            resize: "vertical",
            lineHeight: "1.4",
            boxSizing: "border-box",
            outline: "none",
            textAlign: "left",
          }}
        />

        {/* Buttons */}
        <div
          className="modal-buttons"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "auto",
            width: "100%",
          }}
        >
          <button
            onClick={onClose}
            className="cancel-btn"
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
            className="save-btn"
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
