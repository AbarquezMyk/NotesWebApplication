import React, { useState } from "react";
import settingsIcon from "../../assets/imgs/settings.png";
import "./Settings.css";

const COLORS = ["#A1866F", "#C69C6D", "#8C5E3C", "#D8C3A5", "#BFA67A"];

export default function Settings() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Profile", action: () => alert("Profile clicked") },
    { label: "Preferences", action: () => alert("Preferences clicked") },
  ];

  return (
    <div className="settings-wrapper">
      <button className="settings-btn" onClick={() => setOpen(!open)}>
        <img src={settingsIcon} alt="Settings" />
      </button>

      {open && (
        <div className="settings-menu-popup">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="settings-menu-item"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
              onClick={() => {
                item.action();
                setOpen(false); // close popup after click
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
