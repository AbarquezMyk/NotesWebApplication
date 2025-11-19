import { useState } from "react";
import "./Auth.css";

export default function Register({ onRegister, goToLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  if (!firstName || !lastName || !username || !email || !dob || !password || !confirmPassword) {
    setError("Please fill in all fields.");
    return;
  }
  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setError("");

  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        birthdate: dob,   // match backend field name
        password,
        confirmPassword
      }),
    });

    if (!response.ok) {
      const msg = await response.text();
      setError(msg || "Registration failed.");
      return;
    }

    const data = await response.json();
    console.log("Registered user:", data);

    // Optionally call parent callback
    if (onRegister) onRegister(data);

    // Redirect to login
    goToLogin();
  } catch (err) {
    setError("Server error: " + err.message);
  }
};

  const EyeOpen = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" stroke="#C69C6D" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="#C69C6D" strokeWidth="2" />
  </svg>
);

const EyeClosed = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M2 2L22 22" stroke="#C69C6D" strokeWidth="2" />
    <path d="M17.94 17.94C16.23 19.01 14.19 19.64 12 19.64C6 19.64 2 12 2 12C3.24 9.71 4.97 7.77 7.06 6.35"
      stroke="#C69C6D" strokeWidth="2" />
    <path d="M12 5C18 5 22 12 22 12C21.46 12.96 20.84 13.85 20.17 14.64"
      stroke="#C69C6D" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="#C69C6D" strokeWidth="2" />
  </svg>
);

  return (
    <div className="auth-container">
      <div className="auth-box register-box">
        <h2>Create Account</h2>
        <p className="subtitle">Start organizing your notes easily</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleRegister} className="register-form">
          <div className="name-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="date-input"
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? EyeClosed : EyeOpen}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? EyeClosed : EyeOpen}
            </span>
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>

        <p className="switch">
          Already have an account?{" "}
          <span className="link" onClick={goToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}