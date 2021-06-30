import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getCurrentDate } from "../fuctions/util";
import MenuHome from "../components/MenuHome";
import "../App.css";
import swal from "sweetalert";

function App() {
  const postCreado = () => {
    swal({
      title: "Post Creado",
      icon: "success",
      timer: "35000",
    });
  };
  const history = useHistory();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      history.push("/Login");
    }
  }, [user, history]);

  const [descripcion, setDescripcion] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");

  var fecha = new Date();
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  console.log(fecha.toLocaleDateString("es-ES", options));

  const save = () => {
    fetch(
      `http://localhost:8080/api/guardar/${uuidv4()}/${user.uid}/${categoria}/${descripcion}/${titulo}/${fecha.toLocaleDateString("es-ES",options)}/${user.displayName}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="App">
      <MenuHome />

      <div className="background">
        <div className="container">
          <form className="form">
            <h3 className="sofkabook_title">Agregar Post</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTitulo(e.target.value)}
                value={titulo}
                name="titulo"
                placeholder="Titulo"
              />
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                type="text"
                onChange={(e) => setDescripcion(e.target.value)}
                value={descripcion}
                name="descripcion"
                placeholder="Descripcion"
                rows="3"
              ></textarea>
            </div>
            <label for="categorias">Categoria:</label>

            <select
              name="categorias"
              onChange={(e) => setCategoria(e.target.value)}
              value={categoria}
            >
              <option value="o"></option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Agilismo">Agilismo</option>
              <option value="Q.A">Q.A</option>
              <option value="Otro">Otro</option>
            </select>
            <br />
            <input
              type="submit"
              value="Guardar"
              onClick={() => {
                save();
                postCreado();
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
