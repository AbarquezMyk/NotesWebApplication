import React, { useEffect, useState } from "react";
import { FiFolder } from "react-icons/fi";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import AddCategoryModal from "./AddCategoryModal"; // modal component

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

function Overview() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/notes/read");
      const data = await res.json();

      const categoryCounts = {};
      (data || []).forEach((note) => {
        categoryCounts[note.folder] = (categoryCounts[note.folder] || 0) + 1;
      });

      const categoryArray = Object.keys(categoryCounts).map((cat) => ({
        name: cat,
        count: categoryCounts[cat],
      }));

      setCategories(categoryArray);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  const handleAddCategory = (name) => {
    if (!name.trim()) return;
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) return; // prevent duplicates

    const newCategory = { name, count: 0 };
    setCategories(prev => [...prev, newCategory]);
  };

  return (
    <div className="overview-container">
      <h2 className="categories-header">Categories</h2>

      <div className="categories-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            style={{ borderTop: `4px solid ${getColorForCategory(cat.name)}` }}
          >
            <div className="category-card-content">
              <div
                className="category-icon"
                style={{ backgroundColor: getColorForCategory(cat.name) }}
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
              borderTop: `4px solid #8C5E3C`, // colored top like other cards
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
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
}

export default Overview;
