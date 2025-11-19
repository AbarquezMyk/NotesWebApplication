// src/components/profile/Profile.jsx
import React, { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    notifications: false,
    profilePic: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setProfile({ ...profile, [name]: files[0] });
    } else {
      setProfile({ ...profile, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    console.log("Profile saved:", profile);
    alert("Profile saved successfully!");
  };

  return (
    <div style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", padding: "2rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Profile Settings</h2>
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Profile Picture */}
        <div style={{ textAlign: "center" }}>
          <img
            src={profile.profilePic ? URL.createObjectURL(profile.profilePic) : ""}
            alt="Profile"
            style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", marginBottom: 8 }}
          />
          <br />
          <input type="file" name="profilePic" accept="image/*" onChange={handleChange} />
        </div>

        {/* First & Last Name Side by Side */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        </div>

        {/* Username */}
        <div style={rowStyle}>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        {/* Email */}
        <div style={rowStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        {/* Notifications */}
        <div style={rowStyle}>
          <label style={labelStyle}>
            <input type="checkbox" name="notifications" checked={profile.notifications} onChange={handleChange} /> Enable email notifications
          </label>
        </div>

        {/* Change Password */}
        <h3 style={{ marginTop: "1.5rem" }}>Change Password</h3>
        {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
          <div key={field} style={rowStyle}>
            <label style={labelStyle}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            <input
              type="password"
              name={field}
              value={profile[field]}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        ))}

        <button type="submit" style={buttonStyle}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const labelStyle = {
  width: "150px",
  textAlign: "right",
  fontWeight: 500,
};

const inputStyle = {
  width: "60%",
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: 4,
};

const buttonStyle = {
  width: "100%",
  padding: "0.6rem",
  backgroundColor: "#41382dff",
  color: "white",
  border: "none",
  borderRadius: 4,
  fontWeight: 500,
  cursor: "pointer",
};
