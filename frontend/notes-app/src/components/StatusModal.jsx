import React from "react";
import modalImg from "../assets/imgs/modal.png";

function StatusModal({ show, message, onClose, showButtons = false, onConfirm }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "400px",
          backgroundImage: `url(${modalImg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#3c2f2f",
            fontSize: "1.2rem",
            fontWeight: 600,
            marginBottom: "25px",
          }}
        >
          {message}
        </p>

        {showButtons ? (
          <div style={{ display: "flex", gap: "15px" }}>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              style={{
                background: "#A1866F",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Yes
            </button>
            <button
              onClick={onClose}
              style={{
                background: "#C69C6D",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            style={{
              background: "#A1866F",
              color: "#fff",
              padding: "10px 25px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}

export default StatusModal;
