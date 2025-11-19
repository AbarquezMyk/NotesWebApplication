import { useState } from "react";
import "./Auth.css";

export default function Login({ onLogin, goToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    setError("Please fill in all fields.");
    return;
  }

  setError("");

  try {
    const response = await fetch(
      `http://localhost:8080/api/users/login?username=${username}&password=${password}`,
      { method: "POST" }
    );

    const msg = await response.text();

    if (response.ok && msg.includes("Login successful")) {
      // Pass user info back to parent
      if (onLogin) onLogin(username);
    } else {
      setError(msg || "Invalid username or password.");
    }
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
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your Notes</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? EyeClosed : EyeOpen}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="switch">
          Don't have an account?{" "}
          <span className="link" onClick={goToRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import "./Auth.css";

export default function Login({ onLogin, goToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    setError("Please fill in all fields.");
    return;
  }

  setError("");

  try {
    const response = await fetch(
      `http://localhost:8080/api/users/login?username=${username}&password=${password}`,
      { method: "POST" }
    );

    const msg = await response.text();

    if (response.ok && msg.includes("Login successful")) {
      // Pass user info back to parent
      if (onLogin) onLogin(username);
    } else {
      setError(msg || "Invalid username or password.");
    }
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
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your Notes</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? EyeClosed : EyeOpen}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="switch">
          Don't have an account?{" "}
          <span className="link" onClick={goToRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}