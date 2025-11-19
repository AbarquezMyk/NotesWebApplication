import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";




export default function App() {
  // Replace this with your actual authentication logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <Route path="/register" element={<Register />} />
            {/* Redirect any unknown public routes to homepage */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Private Routes */}
        {isLoggedIn && (
          <>
            {/* Redirect / to /overview */}
            <Route path="/" element={<Navigate to="/overview" />} />
            {/* All private pages inside AppWrapper */}
            <Route path="/*" element={<AppWrapper />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
