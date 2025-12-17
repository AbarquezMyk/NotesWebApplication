import { Core, Blaze } from "@blaze-cardano/sdk";

/**
 * ---------- KOIOS PROVIDER ----------
 * Minimal provider for Blaze to submit transactions via Koios
 */
export const createKoiosProvider = () => {
  return {
    postTransactionToChain: async (signedTx) => {
      // Convert tx to hex
      const txCbor = Buffer.from(await signedTx.to_bytes()).toString("hex");

      // Submit via Koios API
      const res = await fetch("https://api.koios.rest/api/v1/tx/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cbor: txCbor }),
      });

      const data = await res.json();
      if (data?.[0]?.tx_hash) return data[0].tx_hash;
      throw new Error("Transaction submission failed");
    },
    // Add any other provider methods Blaze might require if needed
  };
};

/**
 * ---------- FORMAT NOTE CONTENT ----------
 * Splits long note content into 64-byte chunks for Cardano metadata
 */
export const formatContent = (content) => {
  if (content.length <= 64) return Core.Metadatum.newText(content);

  const chunks = content.match(/.{1,64}/g) || [];
  const list = new Core.MetadatumList();
  chunks.forEach((chunk) => list.add(Core.Metadatum.newText(chunk)));
  return Core.Metadatum.newList(list);
};

/**
 * ---------- SEND TRANSACTION ----------
 * @param {any} walletApi - Lace wallet API from injected window.cardano object
 * @param {string} targetAddress - Recipient address (bech32)
 * @param {number} lovelaceAmount - Amount in lovelace
 * @param {string} noteContent - Note text for metadata
 * @param {string} action - Action type (e.g., "tip")
 */
export const sendTransaction = async (
  walletApi,
  targetAddress,
  lovelaceAmount,
  noteContent,
  action
) => {
  if (!walletApi) throw new Error("Wallet API is required");

  const provider = createKoiosProvider();
  const blaze = await Blaze.from(provider, walletApi); // Lace wallet API injected

  // Build transaction
  let tx = blaze
    .newTransaction()
    .payLovelace(Core.Address.fromBech32(targetAddress), lovelaceAmount);

  // Metadata
  const metadata = new Map();
  const label = 42819n; // unique app label
  const metadatumMap = new Core.MetadatumMap();

  metadatumMap.insert(
    Core.Metadatum.newText("action"),
    Core.Metadatum.newText(action)
  );
  metadatumMap.insert(
    Core.Metadatum.newText("note"),
    formatContent(noteContent)
  );
  metadatumMap.insert(
    Core.Metadatum.newText("created_at"),
    Core.Metadatum.newText(new Date().toISOString())
  );

  metadata.set(label, Core.Metadatum.newMap(metadatumMap));
  tx.setMetadata(new Core.Metadata(metadata));

  // Complete, sign, and submit
  const completedTx = await tx.complete();
  const signedTx = await blaze.signTransaction(completedTx);
  const txId = await blaze.provider.postTransactionToChain(signedTx);

  return txId;
};
