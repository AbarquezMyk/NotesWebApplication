export async function loadCSL() {
  try {
    const Cardano = await import(
      "@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib"
    );

    return Cardano;
  } catch (err) {
    console.error("CSL failed to import:", err);
    return null;
  }
}