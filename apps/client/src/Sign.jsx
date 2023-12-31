import { useState } from "react";
import { sign, getPublicKey } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes, bytesToHex, toHex, hexToBytes } from "ethereum-cryptography/utils";
import server from './server';


function Sign({ txToSign, setTxToSign, setBalance , setLoading}) {
    const [pKey, setPKey] = useState("put your private Key to sign");
    // const [loading, setLoading] = useState(false);

    // const sender  = txToSign.sender;
    // const amount = txToSign.amount;
    // const recipient = txToSign.recipient; 

    async function signtx() {
        setLoading(true);
        var nonceString = "";
        try {
            const {
                data: { nonce },
            } = await server.get('/nonce');
            nonceString = nonce.toString;
            // nonceString = "8";
        } catch (err) {
            setLoading(false)
            if (err?.response?.data) alert(err.response.data.message);
             else console.log(err);
            return;
        }
        // console.log (txToSign)
        
        // console.log (txToSign);
        const message = JSON.stringify(txToSign) + nonceString;
        console.log("message : ", message)
        const msgHash = keccak256(utf8ToBytes(message))
        try {
            const txSigned = await sign(msgHash, pKey, { recovered: true });
            console.log("txsigned : ", txSigned)
            console.log("msgHash : ", msgHash)
            const {
                data: { balance },
            } = await server.post(`send`, {
                txToSign: txToSign,
                msgHash: toHex(msgHash),
                txSigned: toHex(txSigned[0]),
                recovery: txSigned[1],
            });
            setBalance(balance);
            setLoading(false);
            setTxToSign(null)
        } catch (err) {
            console.log(err)
            alert(err.response.data.message);
            setLoading(false);
        }
        setLoading(false);

    }

    return (
        <div className="signModal">
            {/* <form className="container transfer"> */}
            <h2> Sign The transaction with your private Key</h2>
            <label> Private Key
                <input
                    placeholder="Enter your private Key"
                    value={pKey}
                    onChange={(e) => setPKey(e.target.value)}
                ></input>
            </label>
            <button className="button" onClick={() => setTxToSign(null)}>Cancel</button>
            <button className="button" onClick={signtx}>Sign</button>
            {/* </form> */}


            {/* //  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, consequuntur ut voluptates rem, minima nulla excepturi numquam odit, provident cumque nesciunt perferendis harum recusandae soluta inventore ex sapiente repellat suscipit.</p> */}
        </div>
    )
} //

export default Sign; //ttt