import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Homepage from "./components/homepage/Homepage";
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
  // 🔹 Store FULL user object in state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isLoggedIn = !!user;

  // 🔹 Sync user with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔹 Refresh user info from backend when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:8080/api/users/me")
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("Error refreshing user:", err));
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/register" element={<Register onRegister={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          /* Private Routes */
          <Route
            path="/*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AppWrapper user={user} setUser={setUser} onLogout={() => setUser(null)} />
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
    </Router>
  );
}
