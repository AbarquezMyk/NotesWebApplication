export function generateSimpleWallet() {
    const walletAddress = "wallet_" + Math.random().toString(36).substring(2);
    const walletPrivateKey = "priv_" + crypto.randomUUID();
  
    return { walletAddress, walletPrivateKey };
  }  