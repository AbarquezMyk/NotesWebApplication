import React, { useState, useEffect } from "react";
import notaGif from "../assets/imgs/Nota.gif";

function Sidebar({ activePage, setActivePage }) {
  const [gifKey, setGifKey] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setGifKey(Date.now());
    }, 5000); // replay every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="sidebar" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        className="sidebar-logo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "1rem 0",
        }}
      >
        <img
          key={gifKey}
          src={notaGif}
          alt="NotaBene Logo"
          style={{
            maxWidth: "120%", // won't exceed sidebar width
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>

      <ul className="sidebar-list" style={{ width: "100%" }}>
        <li
          className={activePage === "Overview" ? "active" : ""}
          onClick={() => setActivePage("Overview")}
        >
          Overview
        </li>
        <li
          className={activePage === "Notes" ? "active" : ""}
          onClick={() => setActivePage("Notes")}
        >
          Notes
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;  