import React, { useState, useEffect } from "react";
import axios from "axios";
/**
 * REQUIRED NEW PROPS:
 * - noteId (for backend)
 * - receiverWallet (the author’s wallet address)
 */
function SendFundsModal({ visible, onClose, walletAddress, noteId, receiverWallet }) {
  const [amount, setAmount] = useState("1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cslReady, setCslReady] = useState(false);
  const [confirmation, setConfirmation] = useState(null); // NEW

  useEffect(() => {
    setCslReady(true);
  }, []);

  useEffect(() => {
    if (visible) {
      setError("");
      setConfirmation(null);
    }
  }, [visible]);

  const handleSend = async () => {
    setError("");
    setLoading(true);

    try {
      if (!window.cardano?.lace) {
        setError("Lace Wallet not installed.");
        setLoading(false);
        return;
      }

      const lace = await window.cardano.lace.enable();

      // Validate receiver
      let receiverAddr;
      try {
        receiverAddr = CSL.Address.from_bech32(receiverWallet);
      } catch {
        setError("Invalid receiver address.");
        setLoading(false);
        return;
      }

      // Validate amount
      if (!amount || parseFloat(amount) <= 0) {
        setError("Amount must be > 0.");
        setLoading(false);
        return;
      }

      // Sender address
      const used = await lace.getUsedAddresses();
      const senderHex = used[0];
      const senderAddr = CSL.Address.from_bytes(Buffer.from(senderHex, "hex"));

      const utxosHex = await lace.getUtxos();
      if (!utxosHex?.length) {
        setError("Your wallet has no ADA.");
        setLoading(false);
        return;
      }

      // Build Tx
      const txBuilder = CSL.TransactionBuilder.new(
        CSL.LinearFee.new(
          CSL.BigNum.from_str("44"),
          CSL.BigNum.from_str("155381")
        ),
        CSL.BigNum.from_str("1000000"),
        CSL.BigNum.from_str("50000000"),
        CSL.BigNum.from_str("50000000"),
        5000,
        5000
      );

      const lovelace = CSL.Value.new(
        CSL.BigNum.from_str((parseFloat(amount) * 1_000_000).toString())
      );

      txBuilder.add_output(CSL.TransactionOutput.new(receiverAddr, lovelace));

      utxosHex.forEach((u) => {
        const utxo = CSL.TransactionUnspentOutput.from_bytes(Buffer.from(u, "hex"));
        txBuilder.add_input(utxo.output().address(), utxo.input(), utxo.output().amount());
      });

      txBuilder.add_change_if_needed(senderAddr);

      const txBody = txBuilder.build();
      const txHex = Buffer.from(txBody.to_bytes()).toString("hex");

      const signedTx = await lace.signTx(txHex, true);
      const txHash = await lace.submitTx(signedTx);

      // SHOW CONFIRMATION MESSAGE (INSTEAD OF alert)
      setConfirmation({
        txHash,
        amount,
      });

      // CALL BACKEND (required for your task)
      await axios.post("https://your-backend-url.com/api/tips/send", {
        noteId,
        senderWallet: walletAddress,
        receiverWallet,
        amount: parseFloat(amount),
        txHash,
      });

    } catch (err) {
      setError(err.message || "Transaction failed.");
    }

    setLoading(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Tip the Author</h2>

        {/* Confirmation UI */}
        {confirmation ? (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h3 style={{ color: "#4caf50" }}>Tip Sent Successfully!</h3>
            <p>You sent <strong>{confirmation.amount} ADA</strong></p>
            <p style={{ fontSize: "12px", wordBreak: "break-all" }}>
              Tx Hash: {confirmation.txHash}
            </p>

            <button style={styles.sendBtn} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            {/* ADA DROPDOWN */}
            <label style={styles.label}>Amount (ADA)</label>
            <select
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            >
              <option value="0.5">0.5 ADA</option>
              <option value="1">1 ADA</option>
              <option value="2">2 ADA</option>
              <option value="5">5 ADA</option>
            </select>

            {/* SLIDER */}
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: "100%" }}
            />

            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.buttons}>
              <button style={styles.closeBtn} onClick={onClose}>Cancel</button>
              <button disabled={loading} style={styles.sendBtn} onClick={handleSend}>
                {loading ? "Sending..." : `Send ${amount} ADA`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modal: {
    width: "420px",
    padding: "25px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },
  title: { marginBottom: 15 },
  label: { marginTop: 10, fontWeight: 600 },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  error: { color: "red", marginBottom: 10 },
  buttons: { display: "flex", justifyContent: "space-between", marginTop: 15 },
  closeBtn: {
    background: "#666",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: 6,
    cursor: "pointer",
  },
  sendBtn: {
    background: "#A1866F",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default SendFundsModal;