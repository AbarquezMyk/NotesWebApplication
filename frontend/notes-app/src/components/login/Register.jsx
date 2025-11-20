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
          birthdate: dob,
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
      if (onRegister) onRegister(data);
      goToLogin();

    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <div
        className="auth-box register-box"
        style={{
          maxWidth: "500px",
          padding: "25px 25px",
          borderRadius: "18px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem" }}>Create Account</h2>
        <p className="subtitle" style={{ marginBottom: "15px" }}>
          Start organizing your notes easily
        </p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleRegister} className="two-column-form">
          <div className="column">
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>👁</span>
            </div>
          </div>

          <div className="column">
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="password-wrapper">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>👁</span>
            </div>
          </div>
        </form>

        <input type="date" className="date-input" value={dob} onChange={(e) => setDob(e.target.value)} style={{ width: "100%", marginTop: "10px" }} />

        <button type="submit" onClick={handleRegister} className="register-btn">
          Register
        </button>

        <p className="switch">
          Already have an account? <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
