import React, { useState } from "react";
import paperImg from "../../assets/imgs/paper.png";

function AddCategoryModal({ show, onClose, onAdd }) {
  const [categoryName, setCategoryName] = useState("");

  if (!show) return null;

const handleAdd = async () => {
  if (!categoryName.trim()) return;

  try {
    const res = await fetch("http://localhost:8080/api/categories/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName }),
    });

    if (res.ok) {
      // no need to call onAdd with name, just trigger fetchCategories in Overview
      onAdd(categoryName);  // Optional: keep to trigger state update
      setCategoryName("");
      onClose();
    } else if (res.status === 409) {
      alert("Category already exists!");
    } else {
      alert("Failed to add category!");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server!");
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
            textAlign: "center",
          }}
        >
          <h2 style={{
            fontFamily: "'Indie Flower', cursive",
            fontSize: "1.5rem",
            color: "#3c2f2f",
            margin: 0,
          }}>
            Add Category
          </h2>
        </div>

        {/* Input Box */}
        <div
          style={{
            position: "absolute",
            top: "230px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
          }}
        >
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              outline: "none",
              fontFamily: "'Indie Flower', cursive",
              fontSize: "1.1rem",
              textAlign: "center",
              backgroundColor: "transparent",
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
            justifyContent: "center",
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
