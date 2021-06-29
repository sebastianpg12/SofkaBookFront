import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getCurrentDate } from "../fuctions/util";
import MenuHome from "../components/MenuHome";
import { getFromLocal } from "../fuctions/localstorage";
import "../App.css";

function EditarPost() {
  const history = useHistory();
  const [user] = useAuthState(auth);

  const [post, setPost] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [titulo, setTitulo] = useState("");

  const obtenerDatos = async (id) => {
    const data = await fetch(`http://localhost:8080/api/findPosts/${id}`);
    const post = await data.json();
    setPost(post);
    setDescripcion(post.descripcion)
    setTitulo(post.titulo)
  };

  const editar = () => {
    fetch(
      `http://localhost:8080/api/actualizar/${post?.id}/${user.uid}/${post?.idTitulo}/${descripcion}/${titulo}/${getCurrentDate()}/${user.displayName}`,
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
    <div className="App">
      <MenuHome />
      {post?.idUsuario !== user?.uid ? (
        <div class="alert alert-danger" role="alert">
          Este post no es tuyo, por lo tanto no lo puedes editar.
        </div>
      ) : null}
      <div className="background">
        <div className="container">
          <form className="form">
            <h3 className="sofkabook_title">Editar Post</h3>
            <div className="mb-3">
              {post?.idUsuario === user?.uid ? (
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setTitulo(e.target.value)}
                  value={titulo}
                  name="titulo"
                  placeholder="Titulo"
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  value={titulo}
                  name="titulo"
                  placeholder="Titulo"
                  disabled
                />
              )}
            </div>
            <div className="mb-3">
              {post?.idUsuario === user?.uid ? (
                <textarea
                  className="form-control"
                  type="text"
                  onChange={(e) => setDescripcion(e.target.value)}
                  value={descripcion}
                  name="descripcion"
                  placeholder="Descripcion"
                  rows="3"
                ></textarea>
              ) : (
                <textarea
                  className="form-control"
                  type="text"
                  value={descripcion}
                  name="descripcion"
                  placeholder="Descripcion"
                  rows="3"
                  disabled
                ></textarea>
              )}
            </div>
            {post?.idUsuario === user?.uid ? (
              <input type="submit" value="Guardar" onClick={editar} />
            ) : (
              <input type="submit" value="Guardar" disabled />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarPost;
