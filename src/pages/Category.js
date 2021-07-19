import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import MenuHome from "../components/MenuHome";
import { saveToLocal } from "../fuctions/localstorage";
import swal from "sweetalert"
import { v4 as uuidv4 } from "uuid";

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
      `https://sofkabookbackend.herokuapp.com/api/findByCategory/${busqueda}`
    );
    const categorias = await data.json();
    setCategoria(categorias);
  };

  console.log(categoria);
  return (
    <div className="fontGlobal">
      <MenuHome />


     
     
  <div class="container-xxl ">
  <h1 className="container-fluid text-center margin ">Categorias</h1>
  <div class="alert alert-primary container-xl text-center" role="alert">
  <b>{user?.displayName}</b>, Esta es la seccion de categorias utiliza el selector para buscar una en espeficico
        </div>
  <div class="form-group select">
    
    <select class="form-control" id="exampleFormControlSelect1"   onChange={(e) => setBusqueda(e.target.value)}
        value={busqueda}>
           <option>Seleccionar </option>
        <option value="Tecnologia">Tecnologia</option>
        <option value="Agilismo">Agilismo</option>
        <option value="Q.A">Q.A</option>
        <option value="Otro">Otro</option>
    </select>
    <button
        className="btn buttonFiltrar"
        type="submit"
        value="Aceptar"
        onClick={obtenerCategoria}
      >
        Buscar
        </button>
  </div>
        <div class="row">
          {categoria.map((item) => (
            <div key={item.id} class="col text-center">
              <div class="card cardsPosts">
                
                <div class="card-header p-3">
                <i class="bi bi-tags tag">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-tags "
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                  </svg>
                </i>
                <small className="tag ">{item.categoria}</small>
                  <h4 class="card-title p-1">{item.titulo}</h4>
                  <div></div>

                  <h6>
                    <kbd className="kbd">{item.name}</kbd>
                  </h6>
                  
                    <small>{item.fecha}</small>
                  
                </div>
                <div class="card-body">
                  <Link to={`/EditarPost`}>
                    {item.idUsuario === user?.uid ? (
                      <button
                        type="button"
                        className=" btnActualizar"
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
                      className=" btnDelete "
                      onClick={() => {
                        fetch(
                          `https://sofkabookbackend.herokuapp.com/api/delete/${item.id}`,
                          {
                            method: "DELETE",
                          }
                        ).then((response) => {
                          if (response.status === 200) {
                            postBorrado();

                            setTimeout("document.location.reload()", 1000);
                          }
                        });
                      }}
                    >
                      Borrar
                    </button>
                  ) : null}

                  <Link to={`/${item.id}`}>
                    <button type="button" className="btnLeerMás">
                      Leer Más
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
