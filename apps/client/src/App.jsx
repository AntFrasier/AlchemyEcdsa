import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Sign from "./Sign";
import "./App.scss";
import { useState } from "react";
import Welcome from "./Welcome";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("a8db8ecd276ced6fd64cb8822122efe10ca19d98");
  const [pKey, setPKey ]= useState("");
  const [txToSign, setTxToSign] = useState(null);

  return (
    <div className="app">
      <Welcome />
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        pkey={pKey}
        setPKey={setPKey}
      />
      <Transfer 
        setBalance={setBalance}
        address={address}  
        setTxToSign={setTxToSign}
      />
      {txToSign ? <Sign 
                    setTxToSign={setTxToSign} 
                    txToSign={txToSign}
                    setBalance={setBalance}
                    /> : null}

                    {/* <Sign /> */}
    </div>

  );
}

export default App;
