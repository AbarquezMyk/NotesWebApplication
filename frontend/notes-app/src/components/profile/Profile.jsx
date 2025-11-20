import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import "./Profile.css";
import axios from "axios";

export default function Profile({ user, setUser }) {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePic: "/assets/imgs/1.png",
  });

  const [showModal, setShowModal] = useState(false);

  // 🔹 LOAD USER + LOCAL STORAGE PROFILE PIC
  useEffect(() => {
    const savedPic = localStorage.getItem("profilePic");

    axios
      .get("http://localhost:8080/api/users/me")
      .then((res) => {
        const data = res.data;

        const finalPic =
          savedPic || data.profilePic || "/assets/imgs/1.png";

        const updatedData = {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          dob: data.birthdate || "",
          email: data.email || "",
          username: data.username || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          profilePic: finalPic,
        };

        setProfile(updatedData);
        setUser({ ...data, profilePic: finalPic });
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    const payload = {
      ...profile,
      password: profile.newPassword || profile.currentPassword,
    };

    axios
      .put("http://localhost:8080/api/users/update", payload)
      .then((res) => {
        setProfile({ ...profile, ...res.data });
        setUser(res.data);
        alert("Profile saved successfully!");
      })
      .catch((err) => console.error("Error saving profile:", err));
  };

  // 🔹 WHEN USER PICKS A NEW PROFILE PICTURE
  const handlePicSelect = (img) => {
    const updated = { ...profile, profilePic: img };

    setProfile(updated);
    setUser(updated);

    // 🔥 SAVE TO LOCAL STORAGE SO IT PERSISTS ON REFRESH
    localStorage.setItem("profilePic", img);

    // 🔹 Save to backend (optional)
    axios
      .put("http://localhost:8080/api/users/update", updated)
      .then((res) => {
        setProfile(res.data);
        setUser(res.data);
      })
      .catch((err) => console.error("Error updating profile picture:", err));

    setShowModal(false);
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">Account Settings</h2>

      <form onSubmit={handleSave} className="profile-form">
        {/* Left */}
        <div className="profile-section">
          <h3 className="section-title">Basic Information</h3>

          <div className="profile-pic-wrapper">
            <img src={profile.profilePic} alt="Profile" className="profile-pic" />
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="pic-button"
            >
              Change Picture
            </button>
          </div>

          {renderField("First Name", "firstName", profile.firstName, handleChange)}
          {renderField("Last Name", "lastName", profile.lastName, handleChange)}
          {renderField("Date of Birth", "dob", profile.dob, handleChange, "date")}
          {renderField("Email", "email", profile.email, handleChange, "email")}
        </div>

        {/* Right */}
        <div className="profile-section">
          <h3 className="section-title">Account Information</h3>

          {renderField("Username", "username", profile.username, handleChange)}
          {renderField(
            "Current Password",
            "currentPassword",
            profile.currentPassword,
            handleChange,
            "password"
          )}
          {renderField(
            "New Password",
            "newPassword",
            profile.newPassword,
            handleChange,
            "password"
          )}
          {renderField(
            "Confirm Password",
            "confirmPassword",
            profile.confirmPassword,
            handleChange,
            "password"
          )}

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>

      {showModal && (
        <ProfilePic
          selectedPic={profile.profilePic}
          onSelect={handlePicSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

function renderField(label, name, value, onChange, type = "text") {
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="field-input"
        required={
          name !== "currentPassword" &&
          name !== "newPassword" &&
          name !== "confirmPassword"
        }
      />
    </div>
  );
}
