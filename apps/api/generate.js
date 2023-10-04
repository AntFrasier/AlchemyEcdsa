const secp = require("ethereum-cryptography/secp256k1");

module.exports.generate = () => {
    const privateKey = secp.utils.randomPrivateKey();
    const publicKey = secp.getPublicKey(privateKey);
    const address = publicKey.slice(-20);

    return { privateKey:secp.utils.bytesToHex(privateKey), address: secp.utils.bytesToHex(address) }
}

