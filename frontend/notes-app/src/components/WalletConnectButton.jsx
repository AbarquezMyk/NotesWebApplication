import { saveWalletAddress } from "../api/linkWallet";
import { useWallet } from "../context/WalletContext";

export default function WalletConnectButton() {
  const {
    isConnected,
    connectWallet,
    primaryAddress,
    error,
  } = useWallet();

  useEffect(() => {
    if (isConnected && primaryAddress) {
      saveWalletAddress(primaryAddress);
    }
  }, [isConnected, primaryAddress]);

  return (
    <div>
      {!isConnected ? (
        <button onClick={connectWallet}>Connect Lace Wallet</button>
      ) : (
        <p>Connected: {primaryAddress}</p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}