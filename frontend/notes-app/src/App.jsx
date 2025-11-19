import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import AppWrapper from "./AppWrapper";

export default function App() {
  // Persist login state in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/login"
              element={<Login onLogin={() => setIsLoggedIn(true)} />}
            />
            <Route
              path="/register"
              element={<Register onRegister={() => setIsLoggedIn(true)} />}
            />
            {/* Redirect any unknown path to /login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Private Routes */}
        {isLoggedIn && (
          <>
            {/* All private routes go under AppWrapper */}
            <Route
              path="/*"
              element={<AppWrapper onLogout={() => setIsLoggedIn(false)} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}
