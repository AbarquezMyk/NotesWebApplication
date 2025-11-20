import React, { useState } from "react";
import "./Profile.css";

const images = [
  "/assets/imgs/1.png",
  "/assets/imgs/2.png",
  "/assets/imgs/3.png",
  "/assets/imgs/4.png",
  "/assets/imgs/5.png",
  "/assets/imgs/6.png",
  "/assets/imgs/7.png",
];

export default function ProfilePic({ selectedPic, onSelect, onClose }) {
  const [activePic, setActivePic] = useState(selectedPic);

  // 🔹 Choose an image
  const handleChoose = (img) => {
    setActivePic(img);
  };

  // 🔹 Save choice and notify parent
  const handleSave = () => {
    if (activePic) {
      onSelect(activePic); // send chosen pic back to Profile.jsx
    }
    onClose(); // close modal
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#7F5A40" }}>
          Choose a Profile Picture
        </h3>

        {/* Image options */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Option ${idx + 1}`}
              onClick={() => handleChoose(img)}
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                border: img === activePic ? "3px solid #A1866F" : "2px solid #D8C3A5",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: "0.5rem 1rem",
              background: "#A1866F",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "0.5rem 1rem",
              background: "#8C5E3C",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
