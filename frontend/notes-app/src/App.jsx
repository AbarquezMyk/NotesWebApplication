import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";

function App() {
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState("All Notes");
  const [refresh, setRefresh] = useState(0);

  const folders = ["All Notes", "School", "Personal", "Ideas"];

  return (
    <div className="app-wrapper">
      <Sidebar
        folders={folders}
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
      />

      <main className="main-content">
        <Header
          activeFolder={activeFolder}
          search={search}
          setSearch={setSearch}
        />

        {/* Sticky NoteInput for folders other than All Notes */}
        {activeFolder !== "All Notes" && (
          <div className="note-input-wrapper sticky">
            <NoteInput
              activeFolder={activeFolder}
              onNoteAdded={() => setRefresh(r => r + 1)}
            />
          </div>
        )}

        <NoteList
          activeFolder={activeFolder}
          search={search}
          refresh={refresh}
        />
      </main>
    </div>
  );
}

export default App;
