import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import Overview from "./components/overview/Overview";
import Notes from "./components/notes/Notes";
import Profile from "./components/profile/Profile";
import "./App.css";

export default function AppWrapper({ user, setUser, onLogout }) {
  const navigate = useNavigate();

  // Persist active page
  const [activePage, setActivePage] = useState(
    () => localStorage.getItem("activePage") || "Overview"
  );

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
    navigate("/" + activePage.toLowerCase()); // ✅ auto-route based on state
  }, [activePage, navigate]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          user={user}
          setUser={setUser}
          onLogout={onLogout}
          setActivePage={setActivePage}   // ✅ pass down
        />

        <div style={{ flex: 1, overflowY: "auto" }}>
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/notes" element={<Notes user={user} />} />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />
            <Route path="*" element={<Navigate to="/overview" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
