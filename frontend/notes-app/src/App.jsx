import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import Overview from "./components/overview/Overview";
import Notes from "./components/notes/Notes";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";

import "./App.css";

// Main app wrapper for logged-in users
function AppWrapper() {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div
        className="main-area"
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="*" element={<Navigate to="/overview" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Main App
export default function App() {
  const isLoggedIn = false; // <-- replace with your login state

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <Route path="/*" element={<AppWrapper />} />
        )}
      </Routes>
    </Router>
  );
}
