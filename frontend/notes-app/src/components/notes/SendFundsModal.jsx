import React, { useState, useEffect } from "react";

// Import CSL - no explicit WASM loading needed for this version/setup
import * as CSL from "@emurgo/cardano-serialization-lib-browser";

function SendFundsModal({ visible, onClose, walletAddress }) {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cslReady, setCslReady] = useState(false);

  // No WASM init needed - CSL is ready after import
  useEffect(() => {
    setCslReady(true);
    console.log("CSL loaded successfully!");
  }, []);

  // Auto-fill receiver
  useEffect(() => {
    if (visible && walletAddress) {
      setReceiver(walletAddress);
      setError("");
    }
  }, [visible, walletAddress]);

  const handleSend = async () => {
    setError("");

    try {
      setLoading(true);

      if (!cslReady) {
        setError("Cardano Serialization Lib not loaded.");
        setLoading(false);
        return;
      }

      if (!window.cardano?.lace) {
        setError("Lace Wallet not installed.");
        setLoading(false);
        return;
      }

      const lace = await window.cardano.lace.enable();

      // Validate receiver
      let receiverAddr;
      try {
        receiverAddr = CSL.Address.from_bech32(receiver);
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
      const usedAddresses = await lace.getUsedAddresses();
      if (!usedAddresses?.length) {
        setError("Unable to read your wallet address.");
        setLoading(false);
        return;
      }

      const senderAddr = CSL.Address.from_bytes(
        Buffer.from(usedAddresses[0], "hex")
      );

      // UTXOs
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

      // Convert ADA → lovelace
      const lovelace = CSL.Value.new(
        CSL.BigNum.from_str(
          Math.floor(parseFloat(amount) * 1_000_000).toString()
        )
      );

      txBuilder.add_output(
        CSL.TransactionOutput.new(receiverAddr, lovelace)
      );

      utxosHex.forEach((u) => {
        const utxo = CSL.TransactionUnspentOutput.from_bytes(
          Buffer.from(u, "hex")
        );
        txBuilder.add_input(
          utxo.output().address(),
          utxo.input(),
          utxo.output().amount()
        );
      });

      txBuilder.add_change_if_needed(senderAddr);

      // Build unsigned tx body
      const txBody = txBuilder.build();
      const txHex = Buffer.from(txBody.to_bytes()).toString("hex");

      const signedTx = await lace.signTx(txHex, true);
      const txHash = await lace.submitTx(signedTx);

      alert(`Transaction sent!\nTx Hash:\n${txHash}`);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Transaction failed.");
    }

    setLoading(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Send ADA</h2>

        <label style={styles.label}>Receiver Address</label>
        <input
          type="text"
          readOnly
          value={receiver}
          style={{ ...styles.input, background: "#eee" }}
        />

        <label style={styles.label}>Amount (ADA)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.buttons}>
          <button style={styles.closeBtn} onClick={onClose}>Close</button>
          <button disabled={loading} style={styles.sendBtn} onClick={handleSend}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
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