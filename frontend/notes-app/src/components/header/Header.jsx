import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Header({ username }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // <- useNavigate hook

  const handleLogout = () => {
    // You can also clear any auth state here if you have one
    navigate("/login"); // Redirect to login page
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
