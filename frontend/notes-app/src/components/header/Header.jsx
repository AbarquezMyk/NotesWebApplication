import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function Header({ username, onLogout }) {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Clear localStorage if you store login state
    localStorage.removeItem("isLoggedIn");
    // Call the parent logout function
    if (onLogout) onLogout();
    // No navigate needed — App.jsx handles route rendering
  };

  return (
    <header className="app-header">
      <div className="user-menu">
        <button className="user-button" onClick={() => setOpen(!open)}>
          Hello, <span className="username">@{username}</span>
          <FiChevronDown />
        </button>

        {open && (
          <ul className="dropdown-menu">
            <li>Profile</li>
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              Log Out
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
