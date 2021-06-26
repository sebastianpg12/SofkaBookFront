import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { saveToLocal } from "../fuctions/localstorage";
import MenuHome from "../components/MenuHome";
export default function Home() {
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

      <div class="container-xxl">
        <div class="row">
          {arrayPosts.map((item) => (
            <div key={item.id} class="col-6 text-center">
              <div class="card cardsPosts">
                <div class="card-header">
                  <h4 class="card-title">{item.titulo}</h4>
                </div>
                <div class="card-body">
                  <p class="card-text">{item.descripcion} </p>
                  <Link to={`/EditarPost`}>
                    {item.idUsuario === user?.uid ? (
                      <button type="button" className="buttons btn btn-dark"
                        onClick={() => {
                          saveToLocal("idPost", item.id);
                        }}
                      >
                        Editar
                      </button>
                    ) : null}
                  </Link>

                  {item.idUsuario === user?.uid ? (
                    <button type="button" className="buttons btn btn-dark"
                      onClick={() => {
                        fetch(`http://localhost:8080/api/delete/${item.id}`, {
                          method: "DELETE",
                        }).then((response) => {
                          if (response.status === 200) {
                            window.location.reload();
                          }
                        });
                      }}
                    >
                      Borrar
                    </button>
                  ) : null}

                  <Link to={`/${item.id}`}>
                  <button type="button" className="buttons btn btn-dark">Abrir Post</button>
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
