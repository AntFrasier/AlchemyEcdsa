import React, { useState } from 'react'
import server from './server';

const Welcome = ({setLoading}) => {
    const [add, setAdd] = useState("your Address")
    const [pKey, setPKey] = useState("your Private Key")

    const generate = async () => {
        setLoading(true);
        const response = await server.get("/generate")
        const addresses = response.data.addresses;
        console.log(addresses)
        setPKey(addresses.privateKey);
        setAdd(addresses.address);
        setLoading(false);
    }
  return (
    <div className='container wallet'>
        <h1>
        Welcome to week 1 Alchémy Uni ECDSA Exercise.
        </h1>
         <ul>
            <li>
                Click generate to get a private key and an address.
            </li>
            <li>
                Save your private key in a block note or some where - thsi app not store the preivate key !
            </li>
            <li>
                Put your address in your wallet
            </li>
            <li>
                Use the send transaction to send an Amount to recipients (every address start with 5)
            </li>
            <li>
                Sign the tx whith your Private Key in the popUp modal
            </li>
        </ul>
        <button className="button" type='button' onClick={()=>{generate()}}>Generate</button>
        <div className="addresses" placeholder='Your Address'>address: {add}</div>
        <div className="addresses">private Key: {pKey}</div>
         </div>
  )
}

export default Welcome