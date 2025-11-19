import React, { useEffect, useState } from "react";
import { FiFolder } from "react-icons/fi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import AddCategoryModal from "./AddCategoryModal";

const COLORS = [
  "#A1866F", "#C69C6D", "#8C5E3C", "#D8C3A5", "#BFA67A",
  "#E1C699", "#9B7A55", "#7F5A40", "#B78C68", "#D4A373",
];

// Generate a consistent color per category
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

  // Load categories on page load
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from backend
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

  // Add new category → save backend → refresh list
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

      await fetchCategories(); // refresh UI instantly
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
        {/* Existing categories */}
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            style={{
              borderTop: `4px solid ${getColorForCategory(cat.name)}`,
            }}
          >
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

        {/* Add Category Card */}
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

      {/* Graph */}
      <div className="categories-graph">
        {categories.length > 0 ? (
          <ResponsiveContainer width="100%" height={150}>
            <LineChart
              data={categories}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#A1866F"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div
            style={{
              width: "100%",
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontStyle: "italic",
              border: "1px dashed #ccc",
              borderRadius: "8px",
            }}
          >
            No categories yet. Add a category to see the graph.
          </div>
        )}
      </div>

      {/* Modal */}
      <AddCategoryModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
}

export default Overview;