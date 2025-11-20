export async function getWalletBalance(address, apiKey) {
    if (!address) return 0;
  
    try {
      const res = await fetch(
        `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`,
        {
          headers: {
            project_id: apiKey
          }
        }
      );
  
      if (!res.ok) {
        console.error("Blockfrost error:", res.status);
        return 0;
      }
  
      const data = await res.json();
  
      if (!data.amount || data.amount.length === 0) return 0;
  
      const lovelaceObj = data.amount.find(a => a.unit === "lovelace");
  
      if (!lovelaceObj) return 0;
  
      return Number(lovelaceObj.quantity) / 1_000_000; // convert to ADA
    } catch (err) {
      console.error("Failed to fetch balance:", err);
      return 0;
    }
  }  