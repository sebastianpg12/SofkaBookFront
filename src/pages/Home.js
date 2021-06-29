import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { saveToLocal } from "../fuctions/localstorage";
import MenuHome from "../components/MenuHome";
import swal from "sweetalert"


export default function Home() {

  const postBorrado= () => {
    swal({
      title: "Post Eliminado",
      icon: "success",
      timer: "35000"
    });
  }
  const [arrayPosts, setArrayPosts] = React.useState([]);

  React.useEffect(() => {
    console.log("");
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:8080/api/findPosts");
    const posts = await data.json();

    setArrayPosts(posts);
  };
  const history = useHistory();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      history.push("/Login");
    }
  }, [user, history]);
  return (
    <div>
      <MenuHome />

      <Link className="filtrar" to={`/Category`}>
        <button type="button " className="buttons btns btn-dark">
          Filtrar
        </button>
      </Link>

      <div class="container-xxl">
        <div class="row">
          {arrayPosts.map((item) => (
            <div key={item.id} class="col-6 text-center">
              <div class="card cardsPosts">
                <i class="bi bi-tags tag">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-tags"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                  </svg>
                </i>
                <small className="tag">{item.categoria}</small>
                <div class="card-header">
                  <h4 class="card-title">{item.titulo}</h4>
                  <h6>
                    <kbd className="kbd">{item.name}</kbd>
                  </h6>
                  <sub>
                    <small>{item.fecha}</small>
                  </sub>
                </div>
                <div class="card-body">
                  <p class="card-text">{item.descripcion} </p>
                  <Link to={`/EditarPost`}>
                    {item.idUsuario === user?.uid ? (
                      <button
                        type="button"
                        className="buttons btns buttonEdit"
                        onClick={() => {
                          saveToLocal("idPost", item.id);
                        }}
                      >
                        Editar
                      </button>
                    ) : null}
                  </Link>

                  {item.idUsuario === user?.uid ? (
                    <button
                      type="button"
                      className="buttons btns buttonDelete "
                      onClick={() => {
                        fetch(`http://localhost:8080/api/delete/${item.id}`, {
                          method: "DELETE",
                        }).then((response) => {
                          if (response.status === 200) {
                            postBorrado()
                            
                            setTimeout('document.location.reload()',1000);
                          }
                        });
                      }}

                      
                    >
                      Borrar
                    </button>
                  ) : null}

                  <Link to={`/${item.id}`}>
                    <button type="button" className="buttons btns btn-dark">
                      Abrir Post
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
