import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar"; 
import Header from "./components/header/Header";
import Overview from "./components/overview/Overview";
import Notes from "./components/notes/Notes";
import "./App.css";

export default function AppWrapper({ onLogout }) {
  const navigate = useNavigate();

  // Persist active page
  const [activePage, setActivePage] = useState(
    () => localStorage.getItem("activePage") || "Overview"
  );

  useEffect(() => {
    localStorage.setItem("activePage", activePage);

    // Only navigate if the current path is still under AppWrapper
    // (i.e., don’t navigate after logout)
    if (window.location.pathname.startsWith("/")) {
      if (activePage === "Overview") navigate("/overview");
      else if (activePage === "Notes") navigate("/notes");
    }
  }, [activePage, navigate]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header onLogout={onLogout} />

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/notes" element={<Notes />} />
            {/* Redirect any unknown private route to Overview */}
            <Route path="*" element={<Navigate to="/overview" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
