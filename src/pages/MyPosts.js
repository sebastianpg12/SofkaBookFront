import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { saveToLocal } from "../fuctions/localstorage";
import MenuHome from "../components/MenuHome";


export default function MyPosts() {

    const [arrayPosts, setArrayPosts] = React.useState([]);
    const [postId, setPostId] = useState("");
  
    
    const history = useHistory();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      history.push("/Login");
    }
  }, [user, history]);

    const obtenerDatos = async () => {
      const data = await fetch(
        `https://sofkabookbackend.herokuapp.com/api/findByIdUsuario/${user.uid}`
      );
      const posts = await data.json();
  
      setArrayPosts(posts);
    };

  

    React.useEffect(() => {
      console.log("");
      obtenerDatos();
    }, []);


  return(
    <div className="fontGlobal">
    <MenuHome />
   
    <div className="container-fluid-right backgroundArrow ">
      <div className="">

      <Link className="" to={`/Category`}>
        <button type="button  " className="buttons btns filtrar ">
          Filtrar
        </button>
      </Link>
      <Link className="" to={`/MyPosts`}>
        <button type="button  " className="buttons btns filtrar">
          Mis Posts
        </button>
      </Link>
      </div>
      
    </div>
    <div class="container-fluid">
    <h1 className="container-fluid text-center margin">Mis posts</h1>
    <div class="alert alert-primary container-xl text-center" role="alert">
    <b>{user?.displayName}</b>, Aqui puedes estar al tanto de tus post
        </div>
      <div class="row">
        {arrayPosts.map((item) => (
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
                <h4 class="card-title p-1 fontGlobal">{item.titulo}</h4>
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
    <br /> <br />
  </div>
  )
}