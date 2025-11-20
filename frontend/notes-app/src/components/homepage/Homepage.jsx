import React from "react";
import { useNavigate } from "react-router-dom";
import notaGif from "../../assets/imgs/Nota.gif";

export default function Homepage({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isLoggedIn) navigate("/overview");
    else navigate("/login");
  };

  const handleRegister = () => {
    if (isLoggedIn) navigate("/overview");
    else navigate("/register");
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
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

          @keyframes floatNote {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(4deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }

          .sticky-note {
            position: absolute;
            background: #fff8b3;
            border: 2px solid #e6d57a;
            box-shadow: 0 5px 10px rgba(0,0,0,0.15);
            border-radius: 8px;
            opacity: 0.20;
            animation: floatNote 5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Floating Sticky Notes */}
      {[...Array(10)].map((_, idx) => (
        <div
          key={idx}
          className="sticky-note"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            width: 50 + Math.random() * 40,
            height: 50 + Math.random() * 40,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}

      {/* Main Card (smaller) */}
      <div
        style={{
          maxWidth: "400px", // smaller width
          width: "90%",
          backgroundColor: "#D8C3A5",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          padding: "30px 20px", // reduced padding
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <img
          src={notaGif}
          alt="NotaBene Logo"
          style={{ maxWidth: "300px", marginBottom: "15px" }} // smaller logo
        />

        <h1 style={{ fontSize: "1.6rem", color: "#8C5E3C", marginBottom: "8px" }}>
          Welcome to NotaBene
        </h1>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#3e3e3e",
            marginBottom: "20px",
            lineHeight: "1.5",
          }}
        >
          Organize your notes and folders easily. Track your ideas, tasks, and
          everything important—all in one place.
        </p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleLogin}
            style={{
              padding: "10px 25px",
              fontSize: "0.95rem",
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
              padding: "10px 25px",
              fontSize: "0.95rem",
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
