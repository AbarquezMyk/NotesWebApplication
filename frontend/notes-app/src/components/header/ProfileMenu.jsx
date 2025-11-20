import React, { useState } from "react";

export default function ProfileMenu({
  username,
  profilePic,
  setUser,
  onLogout,
  setActivePage,
  buttonColor,
  dropdownColor,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Profile button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: buttonColor,
          border: "none",
          borderRadius: "20px",
          padding: "5px 12px",
          cursor: "pointer",
        }}
      >
        <img
          src={profilePic}
          alt="Profile"
          style={{
            width: 35,
            height: 35,
            borderRadius: "50%",
            border: "2px solid #8C5E3C",
          }}
        />
        <span style={{ fontWeight: 500, color: "#fff" }}>{username}</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "10px",
            backgroundColor: dropdownColor,
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            minWidth: "150px",
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: "10px" }}>
            <li
              style={{ padding: "8px", cursor: "pointer" }}
              onClick={() => {
                setActivePage("profile");
                setOpen(false);
              }}
            >
              Profile
            </li>
            <li
              style={{ padding: "8px", cursor: "pointer" }}
              onClick={() => {
                onLogout();
                setUser(null);
                setOpen(false);
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
