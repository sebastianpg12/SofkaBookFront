import React, { useState, useEffect } from "react";
import { db } from "../fuctions/firebaseInit";
import MenuHome from "../components/MenuHome";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { useHistory, Link, useParams } from "react-router-dom";

function ChatOpen() {
  const history = useHistory();
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [mensajeChat, setMensajeChat] = useState("");
  const [titulo, setTitulo] = useState("");

  const [grupo, setGrupos] = React.useState([]);
  const [chat, setChat] = React.useState([]);

  React.useEffect(() => {
    console.log("");
    ObtenerGrupos();
    ObtenerChats(id);
  }, []);

  const ObtenerGrupos = async () => {
    const data = await fetch("http://localhost:8080/apiGrupo/buscarGrupos");
    const grupos = await data.json();
    setGrupos(grupos);
  };

  const ObtenerChats = async (idGrupo) => {
    const data = await fetch(
      `http://localhost:8080/apiMensajes/findByIdGrupo/${idGrupo}`
    );
    const chats = await data.json();
    console.log(chats);
    setChat(chats);
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

  const CrearMensaje = () => {
    fetch(
      `http://localhost:8080/apiMensajes/${uuidv4()}/${mensajeChat}/${fecha.toLocaleDateString(
        "es-ES",
        options
      )}/${user.displayName}/${id}`,

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
                <div className="card cardCrearGrupo">
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
                </div>
                {grupo.map((item) => (
                  <div className="card cardsGrupos" key={item.id}>
                    <Link to={`/ChatOpen/${item.id}`}>{item.titulo}</Link>
                  </div>
                ))}
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
                  Titulo
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Titulo Grupo
                  </a>
                </li>
              </ul>

          {chat.map((mensaje) => ( 
            <div class="chat" key={mensaje.id}>
            <div className="text-chat card text-white bg-dark mb-3">
              <div class="card-header">{mensaje.name}</div>
              {mensaje.titulo}
            </div>
           </div>
              
            
          ))}
          </div>
          <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setMensajeChat(e.target.value)}
                  value={mensajeChat}
                  name="mensaje"
                  placeholder="mensaje"
                />
                <input type="submit" value="Guardar" onClick={() => {
                  CrearMensaje();
                  setTimeout("document.location.reload()", 1000);
              }} />
        </div>
      </div>
    </div>
  );
}

export default ChatOpen;


              

                
             