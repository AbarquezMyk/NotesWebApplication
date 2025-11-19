import React from "react";
import { useNavigate } from "react-router-dom";
import notaGif from "../../assets/imgs/Nota.gif"; 
export default function Homepage({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isLoggedIn) {
      navigate("/overview");
    } else {
      navigate("/login");
    }
  };

  const handleRegister = () => {
    if (isLoggedIn) {
      navigate("/overview"); 
    } else {
      navigate("/register"); 
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #A1866F, #D8C3A5, #E1C699, #D4A373)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientAnimation {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#D8C3A5",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          padding: "40px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src={notaGif}
          alt="NotaBene Logo"
          style={{ maxWidth: "180px", marginBottom: "25px" }}
        />

        <h1 style={{ fontSize: "2rem", color: "#8C5E3C", marginBottom: "15px" }}>
          Welcome to NotaBene
        </h1>
        <p style={{ fontSize: "1rem", color: "#3e3e3e", marginBottom: "30px", lineHeight: "1.6" }}>
          Organize your notes and folders easily. Track your ideas, tasks, and everything important—all in one place.
        </p>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <button
            onClick={handleLogin}
            style={{
              padding: "12px 30px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#8C5E3C",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.2s",
            }}
          >
            Log In
          </button>

          <button
            onClick={handleRegister}
            style={{
              padding: "12px 30px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "2px solid #C69C6D",
              backgroundColor: "#D8C3A5",
              color: "#8C5E3C",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.2s",
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
