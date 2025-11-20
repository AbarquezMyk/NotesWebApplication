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
            opacity: 0.20; /* more transparent */
            animation: floatNote 5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Floating Sticky Notes */}
      {[
        { top: "5%", left: "5%", width: 70, height: 70, delay: "0s" },
        { top: "15%", left: "25%", width: 85, height: 85, delay: "0.5s" },
        { top: "30%", left: "10%", width: 65, height: 65, delay: "1s" },
        { top: "45%", left: "35%", width: 90, height: 90, delay: "1.2s" },
        { top: "60%", left: "5%", width: 70, height: 70, delay: "1.5s" },
        { top: "75%", left: "20%", width: 85, height: 85, delay: "2s" },
        { top: "10%", right: "10%", width: 70, height: 70, delay: "0.7s" },
        { top: "35%", right: "15%", width: 65, height: 65, delay: "1.3s" },
        { top: "60%", right: "5%", width: 75, height: 75, delay: "1.8s" },
        { top: "80%", right: "15%", width: 90, height: 90, delay: "2.5s" },
      ].map((note, idx) => (
        <div
          key={idx}
          className="sticky-note"
          style={{
            top: note.top,
            left: note.left,
            right: note.right,
            width: `${note.width}px`,
            height: `${note.height}px`,
            animationDelay: note.delay,
          }}
        ></div>
      ))}

      {/* Main Card */}
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
          zIndex: 5,
        }}
      >
        <img
          src={notaGif}
          alt="NotaBene Logo"
          style={{ maxWidth: "250px", marginBottom: "10px" }}
        />

        <h1 style={{ fontSize: "2rem", color: "#8C5E3C", marginBottom: "15px" }}>
          Welcome to NotaBene
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#3e3e3e",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          Organize your notes and folders easily. Track your ideas, tasks, and
          everything important—all in one place.
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
