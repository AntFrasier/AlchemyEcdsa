import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance, setTxToSign }) {
  
  const [sendAmount, setSendAmount] = useState("1");
  const [recipient, setRecipient] = useState("d4fa5075f4728243598083e9070fdae837f31683");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  const [hashTx, setHashTx] = useState();

  function transfer(evt) {
    evt.preventDefault();
    if (!address) {
      alert("Please enter your addres in the Wallet Address");
      return;}
    if (!sendAmount) {
      alert("Please enter an Amount");
      return;}
    if (!recipient) {
      alert("Please enter a Recipient Address");
      return;}
    // else if (!amout) {alert("Please enter an amount");}
    // if (!recipient) alert("Please enter recipent address");
    setTxToSign({
      sender: address,
      amount: parseInt(sendAmount),
      recipient})
    
 
    // try {
    //   const {
    //     data: { balance },
    //     } = await server.post(`send`, {
    //       sender: address,
    //       amount: parseInt(sendAmount),
    //       recipient,
    //       HashedTx,
    //     });
    //   setBalance(balance);
    // } catch (ex) {
    //   alert(ex.response.data.message);
    // }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h2>Send Transaction</h2>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
