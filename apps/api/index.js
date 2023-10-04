require("dotenv").config()
const {generate} = require("./generate.js")
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak")
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const address1 = process.env.ADDRESS1;
const address2 = process.env.ADDRESS2;
const address3 = process.env.ADDRESS3;
var nonce = 0;

const balances = {
  [address1]: 100,
  [address2]: 50,
  [address3]: 75,
};
//function signSync(msgHash: Uint8Array, privateKey: Uint8Array, opts?: Options): Uint8Array;
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 5;
  res.send({ balance });
});

app.get("/nonce", (req, res) => {
  res.status(200).send({ nonce });
});

app.get("/generate", (req, res) => {
  const addresses = generate();
  res.status(200).send({ addresses });
});

app.post("/send", (req, res) => {
  const { txToSign, msgHash, txSigned,recovery } = req.body;

  setInitialBalance(txToSign.sender);
  setInitialBalance(txToSign.recipient);

  const hashToVerify = keccak256(utf8ToBytes(JSON.stringify(txToSign) + nonce.toString) );
  
  if (toHex(hashToVerify) != msgHash) {
    res.status(403).send({ message:"Problem with the hash !"});
    return;
  }
  const recoveredPublicKey =secp.recoverPublicKey(hashToVerify, txSigned, recovery)
  const recoveredAddress = toHex(recoveredPublicKey.slice(-20));
  console.log("recoveredAddress : ",recoveredAddress)
  console.log("txToSign.sener : ",txToSign.sender)

  if (recoveredAddress !== txToSign.sender) {
    res.status(403).send({message:"The Private Key doent Match !"});
    return;
  }

  if (balances[txToSign.sender] < txToSign.amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[txToSign.sender] -= txToSign.amount;
    balances[txToSign.recipient] += txToSign.amount;
    nonce ++;
    res.status(200).send({ balance: balances[txToSign.sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 5;
  }
}

module.exports = app;
