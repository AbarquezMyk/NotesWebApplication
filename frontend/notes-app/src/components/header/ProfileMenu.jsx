import React, { useState } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

function ProfileMenu({ username, profilePic }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="user-menu">
      <button className="user-button" onClick={() => setOpen(!open)}>
        {profilePic && <img src={profilePic} alt="Profile" className="profile-pic" />}
        Hello, <span className="username">@{username}</span>
      </button>

      {open && (
        <ul className="dropdown-menu">
          <li><FiUser size={16} /> Profile</li>
          <li><FiLogOut size={16} /> Log Out</li>
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;
