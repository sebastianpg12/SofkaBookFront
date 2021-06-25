
import React, { useState, useEffect } from 'react'
import { auth, signOut } from '../fuctions/firebaseFuctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory, Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import {getCurrentDate} from '../fuctions/util'

import '../App.css';

function App() {

  const history = useHistory();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      history.push("/Login");
    }
  }, [user, history])

  const [descripcion, setDescripcion] = useState("");
  const [titulo, setTitulo] = useState("");
  const [comentario] = useState("0");


  const save = () => {
    fetch(`http://localhost:8080/api/${uuidv4()}/${user.uid}/${uuidv4()}/${descripcion}/${titulo}/${comentario}/${getCurrentDate()}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => console.log(data));
  }
  return (

    <div className="App">

      <nav className="navPrincipal navbar navbar-expand-lg navbar-dark" >
        <div className="container-fluid">
          <Link to="/"> <img width="160px" height="30px" src="https://d3j0t7vrtr92dk.cloudfront.net/sofkauniversity/1613419253_SofkaU_Prueba3.png?" /></Link>
         
          <div>

            <h6 className="namePerson"> {user?.displayName} <img alt="perfil" className="photoProfile" src={user?.photoURL} /></h6>
          </div>

        </div>
      </nav>
      <div className="background">
        <div className="container">
          <form className="form">
            <h3 className="sofkabook_title">Agregar Post</h3>
            <div className="mb-3">
              <input type="text" className="form-control" onChange={(e) => setTitulo(e.target.value)} value={titulo} name="titulo" placeholder="Titulo" />
            </div>

            <div className="mb-3">

              <textarea className="form-control" type="text" onChange={(e) => setDescripcion(e.target.value)} value={descripcion} name="descripcion" placeholder="Descripcion" rows="3"></textarea>
            </div>
            <input type="submit" value="Guardar" onClick={save} />
          </form>
        </div>

      </div>
      <button className="btnSignOut btn btn-primary" onClick={signOut} >Cerrar Sesión</button>
    </div>
  );
}

export default App;
