import React from "react";
import { useNavigate } from "react-router-dom";
import { useLaceWallet } from "../hooks/useLaceWallet";
import "./WalletConnect.css";

export default function WalletConnect() {
  const {
    isAvailable,
    isConnecting,
    isConnected,
    shortenedAddress,
    connectWallet,
    disconnectWallet,
    error,
  } = useLaceWallet();

  const navigate = useNavigate();

  return (
    <div className="wallet-page">

      {/* Back button */}
      <button className="btn-primary back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Main content */}
      <div className="wallet-center">
        <h3 className="wallet-title">Lace Wallet</h3>

        {!isAvailable && (
          <div className="wallet-notice">
            Lace Wallet extension not detected. Please install it.
          </div>
        )}

        {error && <div className="wallet-error">{error}</div>}

        {!isConnected ? (
          <button
            className="btn-primary"
            onClick={connectWallet}
            disabled={isConnecting || !isAvailable}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <div className="wallet-inline">
            <span className="info-label">Address:</span>
            <span className="info-value">{shortenedAddress}</span>

            <button className="btn-secondary" onClick={disconnectWallet}>
              Disconnect
            </button>

            <button className="btn-primary" onClick={connectWallet}>
              Reconnect
            </button>
          </div>
        )}

        {isConnected && (
          <div className="wallet-status connected">Connected ✅</div>
        )}
        {!isConnected && (
          <div className="wallet-status disconnected">Not Connected ❌</div>
        )}

        {/* ------------------------- */}
        {/*  TRANSACTION HISTORY UI   */}
        {/* ------------------------- */}
        {isConnected && (
          <div className="transaction-section">
            <h3 className="section-title">Transaction History</h3>

            <div className="transaction-box">
              <h4 className="tx-subtitle">You Tipped</h4>
              <div className="tx-empty">No outgoing tips yet.</div>
            </div>

            <div className="transaction-box">
              <h4 className="tx-subtitle">You Received</h4>
              <div className="tx-empty">No incoming tips yet.</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
