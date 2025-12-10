// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Notes from "./components/notes/Notes";
import Sidebar from "./components/Sidebar";

// CSS
import "./App.css";

export default function App() {
  // Track active page for sidebar indicator
  const [activePage, setActivePage] = useState("Notes");

  return (
    <Router>
      <div className="app-container" style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar with activePage state */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main content */}
        <div className="main-content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={<Notes />}
            />
            {/* Any other route → redirect to Notes */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
