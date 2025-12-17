// blockchain/submitTx.js
import { submitSignedTx } from "./koios";

export async function signAndSubmitTx(lucid, tx) {
  const signed = await tx.sign().complete();
  const cbor = signed.toString();     // hex
  
  const result = await submitSignedTx(cbor);
  return result;                      // tx hash or error
}
