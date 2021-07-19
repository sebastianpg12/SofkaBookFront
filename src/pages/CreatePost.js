import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getCurrentDate } from "../fuctions/util";
import { useForm } from "react-hook-form";
import MenuHome from "../components/MenuHome";
import "../App.css";
import swal from "sweetalert";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function App() {

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {

  }

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

  const save = () => {
    fetch(
      `https://sofkabookbackend.herokuapp.com/api/guardar/${uuidv4()}/${
        user.uid
      }/${categoria}/${descripcion}/${titulo}/${fecha.toLocaleDateString(
        "es-ES",
        options
      )}/${user.displayName}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="App fontGlobal">
      <MenuHome />

      <div className="background">
        <div className="container-flex formularioCrearPost">
          <div classname="">
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
                  required
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
                  required
                ></textarea>
              </div>

              <Tippy
                content={<span style={{ color: "white" }}>Seleccionar</span>}
              >
                <div class="form-group select ">
                  <select
                    name="categorias"
                    onChange={(e) => setCategoria(e.target.value)}
                    value={categoria}
                    class="form-control cursor-pointer width"
                    required
                  >
                    <option>Seleccionar Categoria</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Agilismo">Agilismo</option>
                    <option value="Q.A">Q.A</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </Tippy>

              <br />
              <input
                className="buttonSave"
                type="submit"
                value="Guardar"
                onClick={() => {
                  save();
                }}
              />
            </form>
          </div>
        </div>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Titulo
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>Procura poner un titulo corto y contundente.</strong>{" "}
                <code>
                  Ejemplo: ¿Sabias que sofka cuenta con estos beneficios?
                </code>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Descripcion
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>
                  Luego de interesar a tus compañeros con tu titulo,
                </strong>{" "}
                Intenta ser lo más descriptivo y puntual que puedas{" "}
                <code></code>.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Categoria
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>Por ultimo pero no menos importante</strong> cuida la
                categoria en la que posicionas tu post
                <code>
                  {" "}
                  Ejemplo: un post de ordenadores ira en la categoria tecnologia
                </code>
                .
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid ">
          <div className="card sizeCard">
                <div className="card-header">
                <h6>Video de ejemplo</h6>
                </div>
                <div className="card-body">
                <a href="https://youtu.be/1lMgQAf-9ZQ" target="_blank" className="Link">Ver</a>
               
                </div>
          </div>
         
        
        </div>
        

        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default App;
