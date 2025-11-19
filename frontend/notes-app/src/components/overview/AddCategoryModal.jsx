import React, { useState } from "react";
import paperImg from "../../assets/imgs/paper.png"; // adjust path if needed

function AddCategoryModal({ show, onClose, onAdd }) {
  const [categoryName, setCategoryName] = useState("");

  if (!show) return null;

  const handleAdd = () => {
    if (categoryName.trim()) {
      onAdd(categoryName.trim());
      setCategoryName("");
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      {/* Paper Container */}
      <div
        style={{
          position: "relative",
          width: "420px",
          height: "550px",
          backgroundImage: `url(${paperImg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Add Category Text */}
        <div
          style={{
            position: "absolute",
            top: "160px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Indie Flower', cursive", // same handwriting style
              fontSize: "1.5rem",
              color: "#3c2f2f",
              margin: 0,
              textAlign: "center",
            }}
          >
            Add Category
          </h2>
        </div>

        {/* Input Box */}
        <div
          style={{
            position: "absolute",
            top: "230px",
            left: "52%",
            transform: "translateX(-50%)",
          }}
        >
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{
              width: "70%",
              padding: "10px",
              border: "none",
              outline: "none",
              fontFamily: "'Indie Flower', cursive", // same as heading
              fontSize: "1.1rem",
              textAlign: "center",
              backgroundColor: "transparent", // see paper lines
              color: "#3c2f2f",
            }}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            position: "absolute",
            top: "335px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "20px",
          }}
        >
          <button
            onClick={handleAdd}
            style={{
              padding: "8px 25px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#A1866F",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontFamily: "'Indie Flower', cursive",
            }}
          >
            Add
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "8px 25px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#C69C6D",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontFamily: "'Indie Flower', cursive",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
