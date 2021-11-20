import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { getCurrentDate } from "../fuctions/util";
import MenuHome from "../components/MenuHome";
import { getFromLocal } from "../fuctions/localstorage";
import "../App.css";
import swal from "sweetalert";

function EditarPost() {
  const postActualizado = () => {
    swal({
      title: "Post Actualizado",
      icon: "success",
      timer: "35000",
    });
  };
  const history = useHistory();
  const [user] = useAuthState(auth);

  const [categoria, setCategoria] = useState("");
  const [post, setPost] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [titulo, setTitulo] = useState("");

  const obtenerDatos = async (id) => {
    const data = await fetch(`https://taicbook.herokuapp.com/api/findPosts/${id}`);
    const post = await data.json();
    setPost(post);
    setDescripcion(post.descripcion)
    setTitulo(post.titulo)
  };

  const editar = () => {
    fetch(
      `https://taicbook.herokuapp.com/api/actualizar/${post?.id}/${user?.uid}/${categoria}/${descripcion}/${titulo}/${getCurrentDate()}/${user?.displayName}`,
      { method: "PUT" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    if (!user) {
      history.push("/Login");
    }

    obtenerDatos(getFromLocal("idPost"));
  }, [user, history]);
  return (
    <div className="App fontGlobal">
      <MenuHome />
      {post?.idUsuario !== user?.uid ? (
        <div class="alert alert-danger" role="alert">
          Este post no es tuyo, por lo tanto no lo puedes editar.
        </div>
      ) : null}
      <div className="background">
        <div className="container-flex formularioCrearPost">
          <div classname="">
          <form className="form">
            <h3 className="sofkabook_title">Editar Post</h3>
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
                rows="3"required
              ></textarea>
            </div > 

            <div class="form-group select">
            <select
              name="categorias"
              onChange={(e) => setCategoria(e.target.value)}
              value={categoria}
              class="form-control"
            >
              <option >Escoger</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Agilismo">Agilismo</option>
              <option value="Q.A">Q.A</option>
              <option value="Otro">Otro</option>
            </select>
            </div>
            

          
            <br />
            <input
              className="buttonSave"
              type="submit"
              value="Guardar"
              onClick={editar()}
            
            />
          </form>
          </div>
          
        </div>
        <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Titulo
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>Procura poner un titulo corto y contundente.</strong>  <code>Ejemplo: ¿Sabias que sofka cuenta con estos beneficios?</code>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Descripcion
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>Luego de interesar a tus compañeros con tu titulo,</strong> Intenta ser lo más descriptivo y puntual que puedas <code></code>.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Categoria
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>Por ultimo pero no menos importante</strong> cuida la categoria en la que posicionas tu post<code> Ejemplo: un post de ordenadores ira en la categoria tecnologia</code>.
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  );
}

export default EditarPost;
