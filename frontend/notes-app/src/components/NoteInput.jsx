import React, { useState } from "react";
import axios from "axios";
import { generateNoteWallet } from "../../wallet/generateNoteWallet";

const API_URL = "http://localhost:8080/api/notes";

function NoteInput({ activeFolder, onNoteAdded }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addNote = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      // Generate a wallet for this note
      const wallet = await generateNoteWallet();

      const newNote = {
        title: input.substring(0, 20) || "Untitled",
        text: input,
        categoryId: activeFolder,  
        walletAddress: wallet.address,
        walletPrivateKey: wallet.privateKeyHex
      };

      await axios.post(`${API_URL}/create`, newNote);

      setInput("");
      if (onNoteAdded) onNoteAdded(); // refresh list
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
        <button onClick={addNote} disabled={loading}>
          {loading ? "Saving..." : "+ Add"}
        </button>
      </div>
    </section>
  );
}

export default NoteInput;