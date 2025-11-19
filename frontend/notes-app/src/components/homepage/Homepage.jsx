import React from "react";
import { useNavigate } from "react-router-dom";
import notaGif from "../../assets/imgs/Nota.gif"; // adjust path if needed

export default function Homepage() {
  const navigate = useNavigate();

  // Color palette
  const colors = [
    "#A1866F",
    "#C69C6D",
    "#8C5E3C",
    "#D8C3A5",
    "#BFA67A",
    "#E1C699",
    "#9B7A55",
    "#7F5A40",
    "#B78C68",
    "#D4A373",
  ];

  const primary = colors[2];  // #8C5E3C
  const secondary = colors[3]; // #D8C3A5
  const accent = colors[1];    // #C69C6D
  const textColor = "#3e3e3e"; // dark gray

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[3]}, ${colors[5]}, ${colors[9]})`,
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
          backgroundColor: secondary,
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          padding: "40px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <img
          src={notaGif}
          alt="NotaBene Logo"
          style={{ maxWidth: "180px", marginBottom: "25px" }}
        />

        {/* Welcome Text */}
        <h1
          style={{
            fontSize: "2rem",
            color: primary,
            marginBottom: "15px",
          }}
        >
          Welcome to NotaBene
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: textColor,
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          Organize your notes and folders easily. Track your ideas, tasks, and everything important—all in one place.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 30px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: primary,
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.2s",
            }}
          >
            Log In
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "12px 30px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: `2px solid ${accent}`,
              backgroundColor: secondary,
              color: primary,
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
