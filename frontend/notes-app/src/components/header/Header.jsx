import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useWallet } from "../../context/WalletContext.jsx";

function Header({ username, onLogout }) {
  const [open, setOpen] = useState(false);
  const {
    isAvailable,
    isConnecting,
    isConnected,
    networkLabel,
    shortenedAddress,
    connectWallet,
    disconnectWallet,
    error: walletError,
  } = useWallet();

  const handleLogout = () => {
    // Clear localStorage if you store login state
    localStorage.removeItem("isLoggedIn");
    // Call the parent logout function
    if (onLogout) onLogout();
    // No navigate needed — App.jsx handles route rendering
  };

  return (
    <header className="app-header">
      <div className="wallet-section">
        {!isAvailable && (
          <span className="wallet-hint">Install the Lace extension to connect</span>
        )}

        {isAvailable && !isConnected && (
          <button
            className="wallet-button"
            type="button"
            onClick={connectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting…" : "Connect Lace Wallet"}
          </button>
        )}

        {isConnected && (
          <button
            type="button"
            className="wallet-chip"
            onClick={disconnectWallet}
            title="Click to disconnect Lace"
          >
            <span className="wallet-dot" />
            {networkLabel} · {shortenedAddress}
          </button>
        )}

        {walletError && <small className="wallet-error">{walletError}</small>}
      </div>

      <div className="user-menu">
        <button className="user-button" onClick={() => setOpen(!open)}>
          Hello, <span className="username">@{username || "user"}</span>
          <FiChevronDown />
        </button>

        {open && (
          <ul className="dropdown-menu">
            <li>Profile</li>
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              Log Out
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
