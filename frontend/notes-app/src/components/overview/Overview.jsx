import React, { useEffect, useState } from "react";
import { FiFolder, FiTrash2 } from "react-icons/fi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import AddCategoryModal from "./AddCategoryModal";
import StatusModal from "../StatusModal"; // <-- imported

const COLORS = [
  "#A1866F", "#C69C6D", "#8C5E3C", "#D8C3A5", "#BFA67A",
  "#E1C699", "#9B7A55", "#7F5A40", "#B78C68", "#D4A373",
];

const getColorForCategory = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

function Overview() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // DELETE MODAL STATES
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusConfirm, setStatusConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/categories/all-with-count");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const triggerStatus = (msg, confirm = false, category = null) => {
    setStatusMessage(msg);
    setStatusConfirm(confirm);
    setCategoryToDelete(category);
    setShowStatus(true);
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/api/categories/${categoryToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete category");

      await fetchCategories();
      setShowStatus(false);
      setCategoryToDelete(null);
    } catch (err) {
      console.error("Delete failed:", err);
      setStatusMessage("Error deleting category!");
      setStatusConfirm(false);
    }
  };

  const handleAddCategory = async (name) => {
    if (!name.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/api/categories/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.status === 409) {
        alert("Category already exists!");
        return;
      }
      if (!res.ok) throw new Error("Failed to add category");

      await fetchCategories();
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to add category:", err);
      alert("Error adding category!");
    }
  };

  return (
    <div className="overview-container">
      <h2 className="categories-header">Categories</h2>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            style={{
              borderTop: `4px solid ${getColorForCategory(cat.name)}`,
              position: "relative",
            }}
          >
            {/* DELETE BUTTON */}
            <button
              onClick={() => triggerStatus("Are you sure you want to delete this category?", true, cat)}
              className="delete-btn"
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FiTrash2 size={16} color={getColorForCategory(cat.name)} />
            </button>

            <div className="category-card-content">
              <div
                className="category-icon"
                style={{
                  backgroundColor: getColorForCategory(cat.name),
                }}
              >
                <FiFolder size={18} color="#fff" />
              </div>
              <p className="category-name">{cat.name}</p>
              <p className="category-count">{cat.count} notes</p>
            </div>
          </div>
        ))}

        {/* ADD CATEGORY */}
        <div
          className="category-card"
          style={{
            borderTop: "4px solid #8C5E3C",
            cursor: "pointer",
          }}
          onClick={() => setShowAddModal(true)}
        >
          <div className="category-card-content">
            <div
              className="category-icon"
              style={{ backgroundColor: "#8C5E3C" }}
            >
              +
            </div>
            <p className="category-name">Add Category</p>
          </div>
        </div>
      </div>

      {/* GRAPH */}
      <div className="categories-graph">
        {categories.length > 0 ? (
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={categories}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#A1866F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty-graph">
            No categories yet. Add a category to see the graph.
          </div>
        )}
      </div>

      <AddCategoryModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCategory}
      />

      {/* DELETE STATUS MODAL */}
      <StatusModal
        show={showStatus}
        message={statusMessage}
        showButtons={statusConfirm}
        onConfirm={handleDeleteCategory}
        onClose={() => setShowStatus(false)}
      />
    </div>
  );
}

export default Overview;
