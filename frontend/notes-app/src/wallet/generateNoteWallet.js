import * as Cardano from "@emurgo/cardano-serialization-lib-browser";
import { entropyToMnemonic } from "cardano-crypto.js";

// Generate entropy (16 bytes = 12 word seed)
function generateEntropy() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return array;
}

export async function generateNoteWallet() {
  // 1. Entropy → mnemonic
  const entropy = generateEntropy();
  const mnemonic = entropyToMnemonic(entropy);

  // 2. Mnemonic → root key
  const rootKey = Cardano.Bip32PrivateKey.from_bip39_entropy(
    entropy,
    new Uint8Array([])
  );

  // 3. Derive payment key pair
  const accountKey = rootKey.derive(1852 | 0x80000000)
    .derive(1815 | 0x80000000)
    .derive(0 | 0x80000000);

  const paymentKey = accountKey.derive(0).derive(0);
  const paymentPrivateKey = paymentKey.to_raw_key();
  const paymentPublicKey = paymentPrivateKey.to_public();

  // 4. Create base address
  const baseAddress = Cardano.BaseAddress.new(
    0, // 0 = Testnet, 1 = Mainnet
    Cardano.StakeCredential.from_keyhash(paymentPublicKey.hash()),
    Cardano.StakeCredential.from_keyhash(paymentPublicKey.hash())
  );

  const addressBech32 = baseAddress.to_address().to_bech32();

  return {
    address: addressBech32,
    privateKeyHex: Buffer.from(paymentPrivateKey.as_bytes()).toString("hex"),
    mnemonic: mnemonic.join(" "),
  };
}