import React, { useState, useEffect } from "react";
import { db } from "../fuctions/firebaseInit";
import MenuHome from "../components/MenuHome";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { useHistory, Link, useParams } from "react-router-dom";
import Menu from "../components/Menu";

function ChatOpen() {
  const styleMessage = {
    backgroundColor: "#47946b",
    color: "white",
  };

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
    const data = await fetch(
      "https://taicbook.herokuapp.com/apiGrupo/buscarGrupos"
    );
    const grupos = await data.json();
    setGrupos(grupos);
  };

  const ObtenerChats = async (idGrupo) => {
    const data = await fetch(
      `https://taicbook.herokuapp.com/apiMensajes/findByIdGrupo/${idGrupo}`
    );
    const chats = await data.json();
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

  const CrearMensaje = () => {
    fetch(
      `https://taicbook.herokuapp.com/apiMensajes/${uuidv4()}/${mensajeChat}/${fecha.toLocaleDateString(
        "es-ES",
        options
      )}/${user.displayName}/${id}`,

      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  
  return (
    <div  className="fontGlobal">
      <Menu />
      <h1 className="container-fluid text-center margin">Grupo</h1>
      <div className="container-lg">
        
        <div id="global">
        <div id="up"></div>
        <a href="#down"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16" className="coloricons">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
        </svg></a>
          {chat.map((mensaje) => (
            <div className="chat" key={mensaje.id}>
              <div
                className="MensajeContainer"
                style={mensaje.name === user?.displayName ? styleMessage : {}}
              >
                <div class="nombreMensajeChat">
                  {mensaje.name === user?.displayName ? "Tú: " : mensaje.name}{" "}
                </div>
                <p className="mensajeTexto">
                  {mensaje.titulo}{" "}
                  {mensaje.name === user?.displayName ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        fetch(
                          `https://taicbook.herokuapp.com/apiMensajes/deleteMensaje/${mensaje.id}`,
                          {
                            method: "DELETE",
                          }
                        ).then((response) => {
                          if (response.status === 200) {
                            setTimeout("document.location.reload()", 1000);
                          }
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x-octagon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </div>
                  ) : null}
                </p>
   
              </div> 
            </div>
          ))}
           <div id="down"></div>
           <a href="#up" className="coloricons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
          </svg></a>
        </div>

        <div class="container-fluid">
          <div class="row row-cols-2">
            <div class="col">
              {" "}
              <input
                type="text"
                className="form-control inputChat"
                onChange={(e) => setMensajeChat(e.target.value)}
                value={mensajeChat}
                name="mensaje"
                placeholder="Escribe aqui tu mensaje"
              />
            </div>
            <div class="col">
              {" "}
              <button
                type="submit"
                value="Guardar"
                className="btn buttonEnviarChat"
                onClick={() => {
                  CrearMensaje();
                  setTimeout("document.location.reload()", 1000);
                }}
              >
                {" "}
                Enviar{" "}
              </button>
            </div>
          </div>
          <br/>
          <div class="alertcontainer-xl text-center" role="alert">
          <b>{user?.displayName}</b>, Estas dentro de un Chat, el cual pertenece al Grupo que seleccionaste, dependiendo del grupo puedes interactuar y opinar sobre los temas
         respectivos en la zona de texto que tienes justo arriba. <b>¡disfruta!</b>
        </div>
        {/* <div className="container-fluid ">
          <div className="card sizeCard">
                <div className="card-header">
                <h6>Video de ejemplo</h6>
                </div>
                <div className="card-body">
                <a href="https://youtu.be/Ez0nTKrCgVI" target="_blank" className="Link">Ver</a>
                
                </div>
          </div>
         
        
        </div> */}
        </div>

      </div>
    </div>
  );
}

export default ChatOpen;
