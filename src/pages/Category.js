import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import MenuHome from "../components/MenuHome";
import { saveToLocal } from "../fuctions/localstorage";

export default function Profile() {
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
                            window.location.reload();
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
