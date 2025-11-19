import React, { useState } from "react";
import axios from "axios";
import useLaceWallet from "../hooks/useLaceWallet"; 

const API_URL = "http://localhost:8080/api/notes";

function NoteInput({ activeFolder, onNoteAdded }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachWallet, setAttachWallet] = useState(false);

  const {
    laceEnabled,
    connecting,
    connect,
    disconnect,
    isConnected,
    address,
    addressLabel,
    error,
  } = useLaceWallet();

  const addNote = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const newNote = {
        text: input,
        folder: activeFolder,
        timestamp: new Date().toISOString(),
        walletAddress: attachWallet && isConnected ? address : null,
      };

      await axios.post(`${API_URL}/create`, newNote);

      setInput("");
      setAttachWallet(false); 

      if (onNoteAdded) onNoteAdded(); 
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="note-input-wrapper">
      <div className="note-input">
        <textarea
          placeholder="Start typing your note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* 🔹 Wallet / Lace controls */}
        <div className="wallet-row">
          {laceEnabled ? (
            <>
              {isConnected ? (
                <div className="wallet-status">
                  <span>Wallet: {addressLabel}</span>
                  <button type="button" onClick={disconnect}>
                    Disconnect
                  </button>
                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="checkbox"
                      checked={attachWallet}
                      onChange={(e) => setAttachWallet(e.target.checked)}
                    />{" "}
                    Attach this note to my wallet
                  </label>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={connect}
                  disabled={connecting}
                >
                  {connecting ? "Connecting..." : "Connect Lace Wallet"}
                </button>
              )}
            </>
          ) : (
            <small>
              Lace wallet not detected. You can still save notes normally.
            </small>
          )}

          {error && <p className="error-text">{error}</p>}
        </div>

        <button onClick={addNote} disabled={loading}>
          {loading ? "Saving..." : "+ Add"}
        </button>
      </div>
    </section>
  );
}

export default NoteInput;