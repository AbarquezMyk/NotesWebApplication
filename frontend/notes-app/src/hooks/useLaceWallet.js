import { useCallback, useEffect, useMemo, useState } from "react";
import initCardanoWasm from "@emurgo/cardano-serialization-lib-browser";

const hexToBytes = (hex) =>
  Uint8Array.from((hex ?? "").match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []);

function truncateMiddle(value, size = 8) {
  if (!value || value.length <= size * 2) return value;
  return `${value.slice(0, size)}...${value.slice(-size)}`;
}

export default function useLaceWallet() {
  const [laceEnabled, setLaceEnabled] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState("");
  const [networkId, setNetworkId] = useState(null);
  const [error, setError] = useState("");

  const isConnected = Boolean(address);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAvailability = () => {
      const available = Boolean(window?.cardano?.lace);
      setLaceEnabled(available);
    };

    checkAvailability();
    window.addEventListener("cardano#initialized", checkAvailability);

    const interval = setInterval(checkAvailability, 1500);
    return () => {
      window.removeEventListener("cardano#initialized", checkAvailability);
      clearInterval(interval);
    };
  }, []);

  const connect = useCallback(async () => {
    if (!window?.cardano?.lace) {
      setError("Lace wallet not detected. Please install the extension.");
      return;
    }

    setConnecting(true);
    setError("");

    try {
      const laceApi = await window.cardano.lace.enable();
      const [usedAddress] = await laceApi.getUsedAddresses();
      const changeAddress = usedAddress || (await laceApi.getChangeAddress());

      if (!changeAddress) {
        throw new Error("Unable to fetch an address from Lace.");
      }

      const wasm = await initCardanoWasm();
      const addr = wasm.Address.from_bytes(hexToBytes(changeAddress));
      const bech32 = addr.to_bech32();

      const netId = await laceApi.getNetworkId();

      setAddress(bech32);
      setNetworkId(netId);
    } catch (err) {
      console.error("Lace connect failed", err);
      setError(err?.message ?? "Unable to connect to Lace wallet.");
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress("");
    setNetworkId(null);
    setError("");
  }, []);

  const label = useMemo(() => {
    if (!address) return "";
    return truncateMiddle(address, 10);
  }, [address]);

  return {
    laceEnabled,
    connecting,
    connect,
    disconnect,
    isConnected,
    address,
    addressLabel: label,
    networkId,
    error,
  };
}


