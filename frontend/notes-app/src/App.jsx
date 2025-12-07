import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Notes from "./components/notes/Notes";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Notes */}
        <Route path="/" element={<Notes />} />

        {/* Any other route → redirect to Notes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
