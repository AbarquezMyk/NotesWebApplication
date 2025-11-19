import { createContext, useContext } from "react";
import { useLaceWallet } from "../hooks/useLaceWallet";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const wallet = useLaceWallet();
  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}


