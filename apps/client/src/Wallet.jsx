import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, pKey, setPKey }) {

  async function onChange(evt) {
    const address= evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h2>Your Wallet</h2>

      <label>
        Wallet Address
        <input placeholder="Type an address" value={address} onChange={onChange}></input>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
