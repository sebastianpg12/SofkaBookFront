import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { db } from "../fuctions/firebaseInit";
import MenuHome from "../components/MenuHome";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";

function Chat() {
  const [user] = useAuthState(auth);
  const [message, setMessage] = React.useState("");
  const [titulo, setTitulo] = useState("");

  const [grupo, setGrupos] = React.useState([]);

  React.useEffect(() => {
    console.log("");
    ObtenerGrupos();
  }, []);

  const ObtenerGrupos = async () => {
    const data = await fetch("http://localhost:8080/apiGrupo/buscarGrupos");
    const grupos = await data.json();
    setGrupos(grupos);
  };

  var fecha = new Date();
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const CrearGrupo = () => {
    fetch(
      `http://localhost:8080/apiGrupo/${uuidv4()}/${titulo}/${fecha.toLocaleDateString(
        "es-ES",
        options
      )}/${user.displayName}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <MenuHome />

      <div class="container-fluid">
        <div class="row">
          <div class="col-md-auto">
            <div id="global">
              <div>
                <form className="card cardCrearGrupo">
                  <input
                    type="text"
                    className="form-control inputTituloGrupo"
                    onChange={(e) => setTitulo(e.target.value)}
                    value={titulo}
                    name="titulo"
                    placeholder="Nombre grupo"
                  />
                  <button
                    type="submit"
                    className="btn buttonGrupo"
                    onClick={CrearGrupo}
                  >
                    Crear
                  </button>
                </form>
                {grupo.map((item )=>(
                <div className="card cardsGrupos" key={item.id}>
                    <Link to={`/ChatOpen/${item.id}`}>{item.titulo}</Link>
                </div>
            ))             
            }
              </div>
            </div>
          </div>
          <div class="col">
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Sofka Chat
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Creador
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Titulo Grupo
                </a>
              </li>
            </ul>

            <div class="chat">
                
            </div>

          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
