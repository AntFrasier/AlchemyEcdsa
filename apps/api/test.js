const secp = require("ethereum-cryptography/secp256k1");

(async () => {
    // You pass either a hex string, or Uint8Array
    const privateKey = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
    const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
    const publicKey = secp.getPublicKey(privateKey);
    const signature = await secp.sign(messageHash, privateKey);
    const isSigned = secp.verify(signature, messageHash, publicKey);

    console.log("signature : ",isSigned);
  })();