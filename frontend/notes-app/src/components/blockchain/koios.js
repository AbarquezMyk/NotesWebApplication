// blockchain/koios.js
const KOIOS = "https://api.koios.rest/api/v1";

export async function getUtxos(address) {
  const res = await fetch(`${KOIOS}/address_utxos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _addresses: [address] }),
  });
  return await res.json();
}

export async function getProtocolParams() {
  const res = await fetch(`${KOIOS}/epoch_params`);
  const json = await res.json();
  return json[0]; // latest epoch
}

export async function submitSignedTx(cborHex) {
  const res = await fetch(`${KOIOS}/submittx`, {
    method: "POST",
    headers: { "Content-Type": "application/cbor" },
    body: cborHex,
  });
  return await res.text(); // returns tx_hash or error
}
