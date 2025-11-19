import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function Header({ username }) {
  const [open, setOpen] = useState(false);

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
            <li>Log Out</li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
