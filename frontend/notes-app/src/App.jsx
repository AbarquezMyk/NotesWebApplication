import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Homepage from "./components/homepage/Homepage"; // check casing
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import AppWrapper from "./AppWrapper";

// Guard for private routes
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/overview" replace /> : <Homepage />
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/overview" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/overview" replace />
            ) : (
              <Register onRegister={handleLogin} />
            )
          }
        />

        {/* PRIVATE */}
        <Route
          path="/*"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AppWrapper onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}