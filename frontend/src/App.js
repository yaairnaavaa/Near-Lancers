import 'regenerator-runtime/runtime'
import React, { useState } from 'react';
import { login, logout } from './utils'
import "./App.css";
import './styles/style1.css'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const [newToken,setNewToken] = useState({name:"",symbol:"",supply:1000000000,decimal:18});
  const [fileName, setFileName] = useState(null);

  const onChange = e =>{
    e.preventDefault();
    setNewToken({...newToken,[e.target.name]: e.target.value });
  }

  const onChangeFile = e => {
      setFileName(e.target.files[0]);
  }

  const saveNewToken = e =>{
    e.preventDefault();
    newToken.supply = parseInt(newToken.supply);
    newToken.decimal = parseInt(newToken.decimal)
    console.log(newToken);
    console.log(fileName);
  }

  React.useEffect(
    () => {
      if (window.walletConnection.isSignedIn()) {

        window.contract.registrarServicio({nombre:"Limpieza domestica", descripción:"Se realiza todo tipo de limpieza", costo:"300", idUsuario:"yairnava.testnet"})
          .then(x => {
            console.log(x);
        });

        window.contract.consultarUsuarios()
          .then(x => {
            console.log(x);
        });

        window.contract.consultarServicios()
          .then(x => {
            console.log(x);
        });

        // window.contract is set by initContract in index.js
        // window.contract.get_greeting({ account_id: window.accountId })
        //   .then(greetingFromContract => {
        //     set_greeting("Welcome")
        //   })
      }
    },
    []
  )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main style={{color:"white"}}>
        <h1>Welcome to TOKEN FACTORY</h1>
        <p>
          In order to create your own fungible token, you need to sign in. The button below will sign you in using NEAR Wallet.
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    )
  }

  return (
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color:"white"
            }}
          >
            Welcome<br/>
          </label>
          <label style={{color:"white"}}>{window.accountId}</label>
        </h1>
        <div style={{marginBottom: "10vh",color:"white"}}>
          <div style={{textAlign:"center"}}>
            <p>Issue a new token. It'll cost you X Ⓝ</p>
          </div>
          <div className="form">
            <div className="title">Create New Fungible Token</div>
            <div className="input-container ic1">
              <input onChange={onChange} name="name" className="input" type="text" placeholder=" " value={newToken.name}/>
              <div className="cut"></div>
              <label htmlFor="firstname" className="placeholder">Token Name</label>
            </div>
            <div className="input-container ic2">
              <input onChange={onChange} name="symbol" className="input" type="text" placeholder=" " value={newToken.symbol}/>
              <div className="cut"></div>
              <label htmlFor="lastname" className="placeholder">Token Symbol</label>
            </div>
            <div className="input-container ic2">
              <input onChange={onChange} name="supply" className="input" type="number" placeholder=" " value={newToken.supply} />
              <div className="cut"></div>
              <label htmlFor="lastname" className="placeholder">Total Supply</label>
            </div>
            <div className="input-container ic2">
              <input onChange={onChange} name="decimal" className="input" type="number" placeholder=" " value={newToken.decimal} />
              <div className="cut"></div>
              <label htmlFor="lastname" className="placeholder">Token Decimal</label>
            </div>

            <div className="input-container ic2">
              <input onChange={onChangeFile} name="decimal" className="input" type="file" placeholder=" " style={{padding:"15px"}}/>
              <div className="cut"></div>
              <label htmlFor="lastname" className="placeholder">Token Icon</label>
            </div>
            
            <button type="text" className="submit" onClick={saveNewToken}>Create</button>
          </div>
        </div>
      </main>
    </>
  )
}
