import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null); // null means not logged in
  const [showRegister, setShowRegister] = useState(false); // toggle register page
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState("All Notes");
  const [refresh, setRefresh] = useState(0);

  const folders = ["All Notes", "School", "Personal", "Ideas"];

  // Simple login handler
  const handleLogin = (username) => {
    setUser({ name: username });
  };

  // Simple logout handler
  const handleLogout = () => {
    setUser(null);
  };

  // If not logged in, show login or register page
  if (!user) {
    return showRegister ? (
      <Register
        onRegister={(username) => {
          setUser({ name: username });
          setShowRegister(false);
        }}
        goToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login
        onLogin={handleLogin}
        goToRegister={() => setShowRegister(true)}
      />
    );
  }

  // Main notes app
  return (
    <div className="app-wrapper">
      <Sidebar
        folders={folders}
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <Header
          activeFolder={activeFolder}
          search={search}
          setSearch={setSearch}
          user={user}
          onLogout={handleLogout}
        />

        {/* Sticky NoteInput for folders other than All Notes */}
        {activeFolder !== "All Notes" && (
          <div className="note-input-wrapper sticky">
            <NoteInput
              activeFolder={activeFolder}
              onNoteAdded={() => setRefresh((r) => r + 1)}
            />
          </div>
        )}

        <NoteList activeFolder={activeFolder} search={search} refresh={refresh} />
      </main>
    </div>
  );
}

export default App;
