import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";
import Login from "./components/Login";
import Register from "./components/Register";

import Notes from "./components/notes/Notes";
import Overview from "./components/overview/Overview";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // null means not logged in
  const [showRegister, setShowRegister] = useState(false); // toggle register page
  const [activePage, setActivePage] = useState(
    () => localStorage.getItem("activePage") || "Overview"
  );
  const [search, setSearch] = useState("");

  // Example state for folders/notes
  const [folders, setFolders] = useState(["All Notes", "Work", "Personal"]);
  const [activeFolder, setActiveFolder] = useState("All Notes");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

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
      <Login onLogin={handleLogin} goToRegister={() => setShowRegister(true)} />
    );
  }

  // Main notes app
  return (
    <div className="app-wrapper">
      {/* Sidebar for folders */}
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

      {/* Sidebar for page navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div
        className="main-area"
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Header />
        <div className="main-content">
          {activePage === "Overview" && <Overview />}
          {activePage === "Notes" && (
            <Notes search={search} setSearch={setSearch} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;