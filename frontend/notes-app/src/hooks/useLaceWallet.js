import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "laceWalletConnected";

const shortenHex = (value = "", chars = 6) => {
  if (!value) return "";
  return `${value.slice(0, chars + 2)}…${value.slice(-chars)}`;
};

export function useLaceWallet() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const [api, setApi] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const detectWallet = () => {
      const available = Boolean(
        typeof window !== "undefined" && window.cardano?.lace
      );
      setIsAvailable(available);
      return available;
    };

    if (detectWallet()) return undefined;

    const timer = setInterval(() => {
      if (detectWallet()) clearInterval(timer);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !window.cardano?.lace) {
      setIsAvailable(false);
      setError("Lace wallet extension not detected in this browser.");
      return;
    }

    setIsConnecting(true);
    setError("");

    try {
      const laceApi =
        (await window.cardano.lace.enable?.({
          requestIdentification: true,
          requestNotification: true,
        })) ?? (await window.cardano.lace.enable());

      const [network, rewards, used] = await Promise.all([
        laceApi.getNetworkId(),
        laceApi.getRewardAddresses().catch(() => []),
        laceApi.getUsedAddresses().catch(() => []),
      ]);

      setApi(laceApi);
      setNetworkId(network);
      setAddresses(rewards.length ? rewards : used);
      setIsConnecting(false);
      localStorage.setItem(STORAGE_KEY, "true");
    } catch (err) {
      console.error("Lace connection failed:", err);
      setError(err?.info || err?.message || "Unable to connect to Lace wallet.");
      setIsConnecting(false);
      setApi(null);
      setNetworkId(null);
      setAddresses([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setApi(null);
    setNetworkId(null);
    setAddresses([]);
    setError("");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    const shouldReconnect = localStorage.getItem(STORAGE_KEY) === "true";
    if (isAvailable && !api && !isConnecting && shouldReconnect) {
      connectWallet();
    }
  }, [api, connectWallet, isAvailable, isConnecting]);

  const isConnected = Boolean(api);
  const primaryAddress = addresses[0] || "";
  const networkLabel =
    networkId === 1 ? "Mainnet" : networkId === 0 ? "Testnet" : "Unknown";
  const shortenedAddress = useMemo(
    () => shortenHex(primaryAddress),
    [primaryAddress]
  );

  return {
    isAvailable,
    isConnecting,
    isConnected,
    networkId,
    networkLabel,
    addresses,
    primaryAddress,
    shortenedAddress,
    connectWallet,
    disconnectWallet,
    error,
  };
}


