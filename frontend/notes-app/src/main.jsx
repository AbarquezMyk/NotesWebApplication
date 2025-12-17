import { Buffer } from "buffer";
import process from "process";

window.Buffer = Buffer;
window.process = process;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WalletProvider } from "./context/WalletContext.jsx";

// Browser-compatible Blaze SDK
import * as blaze from "@blaze-cardano/sdk";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>
);
