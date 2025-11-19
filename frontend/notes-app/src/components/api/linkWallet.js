export async function saveWalletAddress(address) {
    return fetch("http://localhost:8080/api/users/link-wallet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        walletAddress: address,
      }),
    });
  }  