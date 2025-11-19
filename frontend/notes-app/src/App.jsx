import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import Notes from "./components/notes/Notes";
import Overview from "./components/overview/Overview";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState(
    () => localStorage.getItem("activePage") || "Overview"
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  return (
    <div className="app-wrapper">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="main-area" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Header />
        <div className="main-content">
          {activePage === "Overview" && <Overview />}
          {activePage === "Notes" && <Notes search={search} setSearch={setSearch} />}
        </div>
      </div>
    </div>
  );
}

export default App;
