import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import MenuHome from "../components/MenuHome";
import { saveToLocal } from "../fuctions/localstorage";
import swal from "sweetalert"
export default function Profile() {

  const postBorrado= () => {
    swal({
      title: "Post Eliminado",
      icon: "success",
      timer: "35000"
    });
  }

  const [user] = useAuthState(auth);
  const { id } = useParams();

  const [categoria, setCategoria] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const obtenerCategoria = async () => {
    const data = await fetch(
      `http://localhost:8080/api/findByCategory/${busqueda}`
    );
    const categorias = await data.json();
    setCategoria(categorias);
  };

  console.log(categoria);
  return (
    <div>
      <MenuHome />

      <select
        className="select"
        name="categorias"
        onChange={(e) => setBusqueda(e.target.value)}
        value={busqueda}
      >
        <option value="o"></option>
        <option value="Tecnologia">Tecnologia</option>
        <option value="Agilismo">Agilismo</option>
        <option value="Q.A">Q.A</option>
        <option value="Otro">Otro</option>
      </select>
      <input
        className="buttons"
        type="submit"
        value="Aceptar"
        onClick={obtenerCategoria}
      />

      <div class="container-xxl">
        <div class="row">
          {categoria.map((item) => (
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
