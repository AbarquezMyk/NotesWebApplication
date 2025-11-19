import React, { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";

function ProfileMenu({ username, profilePic, onLogout }) {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) onLogout(); // just update login state
    // No navigate() needed, App.jsx handles redirect automatically
  };

  return (
    <div className="user-menu" style={{ position: "relative" }}>
      <button
        className="user-button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {profilePic && (
          <img
            src={profilePic}
            alt="Profile"
            className="profile-pic"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
        )}
        Hello, <span className="username">@{username}</span>
      </button>

      {open && (
        <ul
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            listStyle: "none",
            padding: "8px 0",
            margin: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            minWidth: "140px",
            zIndex: 1000,
          }}
        >
          <li
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FiUser size={16} /> Profile
          </li>
          <li
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={handleLogout}
          >
            <FiLogOut size={16} /> Log Out
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;
