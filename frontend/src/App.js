import 'regenerator-runtime/runtime'
import React, { useState } from 'react';
import { login, logout } from './utils'
import "./App.css";
import './styles/style1.css'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const [newService, setNewService] = useState({ nombre: "", descripcion: "", costo: ""});

  const [allServices, setAllServices] = useState([]);
  const [usuario, setUsuario] = useState([]);

  const onChange = e => {
    e.preventDefault();
    setNewService({ ...newService, [e.target.name]: e.target.value });
  }

  const saveNewToken = e => {
    e.preventDefault();
    console.log(newService);
    setUsuario(window.accountId);
    window.contract.registrarServicio({nombre:newService.nombre, descripción:newService.descripcion, costo:newService.costo, idUsuario:usuario})
      .then(x => {
        console.log(x);
        window.location.reload()
    });
  }

  React.useEffect(
    () => {
      if (window.walletConnection.isSignedIn()) {
        setUsuario(window.accountId);
        // window.contract.registrarServicio({nombre:"Limpieza domestica", descripción:"Se realiza todo tipo de limpieza", costo:"300", idUsuario:usuario})
        //   .then(x => {
        //     console.log(x);
        // });

        window.contract.consultarUsuarios()
          .then(x => {
            console.log(x);
        });

        window.contract.consultarServicios()
          .then(s => {
            console.log(s);
            setAllServices(allServices => s);
          });

      }
    },
    []
  )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main style={{ color: "white" }}>
        <h1>Welcome to NEAR LANCERS</h1>
        <p style={{ textAlign: "justify" }}>
          NEARLancers is a smart contract in which you can create user profiles and if you wish you can offer services for other users, you can store various services and consult all of them in general or of a specific user using the NEAR protocol, you need to sign in. The button below will sign you in using NEAR Wallet.
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
      </button><br/>
      <button className="link" style={{ float: 'right' }} onClick={() => window.location('profile')}>
        Create Profile
      </button>
      <main style={{ color: "white", background: "black" }}>
        <h1>
          <label style={{ color: "white" }}>Welcome {window.accountId}</label>
        </h1>
        <div style={{marginBottom: "10vh",color:"white"}}>
          <div className="form">
            <div className="title">Create Service</div>
            <div className="input-container ic1">
              <input onChange={onChange} name="nombre" className="input" type="text" placeholder=" " value={newService.nombre}/>
              <div className="cut"></div>
              <label htmlFor="firstname" className="placeholder">Name</label>
            </div>
            <div className="input-container ic2">
              <input onChange={onChange} name="descripcion" className="input" type="text" placeholder=" " value={newService.descripcion}/>
              <div className="cut"></div>
              <label htmlFor="lastname" className="placeholder">Description</label>
            </div>
            <div className="input-container ic2">
              <input onChange={onChange} name="costo" className="input" type="text" placeholder=" " value={newService.costo} />
              <div className="cut"></div>
              <label htmlFor="lastname" className="placeholder">Cost</label>
            </div>
            
            <button type="text" className="submit" onClick={saveNewToken}>Create</button>
          </div>
        </div>

          {allServices.map((service) => (
            <div>
              <div>{service.nombre}</div>
              <div>{service.descripcion}</div>
              <div>$ {service.costo}</div><br></br>
            </div>
          ))}
      </main>
    </>
  )
}
