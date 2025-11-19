import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import Overview from "./components/overview/Overview";
import Notes from "./components/notes/Notes";

import "./App.css";

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");

  // Sync activePage with URL
  useEffect(() => {
    if (location.pathname === "/overview") setActivePage("Overview");
    else if (location.pathname === "/notes") setActivePage("Notes");
  }, [location]);

  // Sidebar click handler
  const handlePageChange = (page) => {
    setActivePage(page);
    if (page === "Overview") navigate("/overview");
    if (page === "Notes") navigate("/notes");
  };

  return (
    <div className="app-wrapper">
      <Sidebar activePage={activePage} setActivePage={handlePageChange} />

      <div className="main-area" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Header search={search} setSearch={setSearch} />

        <div className="main-content">
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/notes" element={<Notes search={search} setSearch={setSearch} />} />
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/overview" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
