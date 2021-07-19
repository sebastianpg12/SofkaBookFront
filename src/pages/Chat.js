import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { db } from "../fuctions/firebaseInit";
import MenuHome from "../components/MenuHome";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import Menu from "../components/Menu";

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
    const data = await fetch(
      "https://sofkabookbackend.herokuapp.com/apiGrupo/buscarGrupos"
    );
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
      `https://sofkabookbackend.herokuapp.com/apiGrupo/${uuidv4()}/${titulo}/${fecha.toLocaleDateString(
        "es-ES",
        options
      )}/${user.displayName}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  

  return (
    <div className="fontGlobal">
      <Menu />

      <div class="container-fluid">
        <h1 className="container-fluid text-center margin">SofkaGrupos</h1>
        <div class="alert alert-primary container-xl text-center" role="alert">
        <b>{user?.displayName}</b>, Bienvenido a los sofkaGrupos aqui podras interactuar en los distintos
          grupos, podras resolver dudas, encontrar sugerencias y novedades o si no hay un grupo del tema del que quieres
          hablar <b>¡crealo!</b>
        </div>
        
        <script src="dist/bundle.js"></script>
        <div>
          <div className="card cardCrearGrupo">
            <div class="card-header">
              <input
                type="text"
                className="form-control inputTituloGrupo"
                onChange={(e) => setTitulo(e.target.value)}
                value={titulo}
                name="titulo"
                placeholder="Nombre grupo"
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn buttonGrupo"
              onClick={() => {
                CrearGrupo();
                setTimeout("document.location.reload()", 1000);
              }}
            >
              Crear
            </button>
          </div>

          <div class="container-fluid containerGrupos">
            <div class="row">
            
              {grupo.map((item) => (
                <div class="col text-center">
                  <div className="containerGrupoName card" key={item.id}>
                    <div class="card-header">
                      <p className="card-title">{item.titulo}</p>
                    </div>

                    <div class="card-body">
                      <Link className="background" to={`/ChatOpen/${item.id}`}>
                        <button className="btn buttonGrupoEnter">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-chat"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
