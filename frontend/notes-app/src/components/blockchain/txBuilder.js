// blockchain/txBuilder.js
import { Lucid, Blockfrost, fromHex, toHex } from "lucid-cardano";

export async function initLucid(laceWallet) {
  const lucid = await Lucid.new(
    undefined,                         // no provider (we fetch by Koios)
    "Preview"
  );

  await lucid.selectWallet(laceWallet);
  return lucid;
}

// CREATE note = store JSON as datum inside a UTXO
export async function buildCreateNoteTx(lucid, noteText) {
  const datum = {
    text: noteText,
    created: Date.now(),
  };

  return await lucid
    .newTx()
    .payToAddressWithData(
      (await lucid.wallet.address()),
      { inline: datum },
      { lovelace: 1500000n }
    )
    .complete();
}

export async function buildUpdateNoteTx(lucid, oldUtxo, newText) {
  const newDatum = {
    text: newText,
    updated: Date.now(),
  };

  return await lucid
    .newTx()
    .collectFrom([oldUtxo])      // consume old note UTXO
    .payToAddressWithData(
      (await lucid.wallet.address()),
      { inline: newDatum },
      { lovelace: 1500000n }
    )
    .complete();
}

export async function buildDeleteNoteTx(lucid, utxo) {
  return await lucid
    .newTx()
    .collectFrom([utxo])          // consume note UTXO
    .addSigner(await lucid.wallet.address())
    .complete();
}
