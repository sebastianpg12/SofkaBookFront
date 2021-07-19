import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import MenuHome from "../components/MenuHome";
import FormComentario from "../components/FormComentario";
import Comentarios from "../components/Comentarios";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import swal from "sweetalert";

export default function Post() {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [post, setPost] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [like, setLikes] = useState([]);

  const YaMeGusta = () => {
    swal({
      title: "Ya diste me gusta",
      confirmButtonText: "Entendido",
      confirmButtonColor: "black",
    });
  };

  const obtenerComentarios = async () => {
    const data = await fetch(
      `https://sofkabookbackend.herokuapp.com/api/findComments/${id}`
    );
    const comentarios = await data.json();
    setComentarios(comentarios);
  };

  const obtenerLike = async () => {
    const data = await fetch(
      `https://sofkabookbackend.herokuapp.com/apiLike/findByPostId/${id}`
    );
    const like = await data.json();
    setLikes(like);
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await fetch(
        `https://sofkabookbackend.herokuapp.com/api/findPosts/${id}`
      );
      const posts = await data.json();
      setPost(posts);
    };
    obtenerLike();
    obtenerDatos();
    obtenerComentarios();
  }, [id]);

  return (
    <div className="fontGlobal">
      <MenuHome />

      <div class="card cardPostIndividual">
        <div class="card-header">
          <br />
          <h3>{post.titulo}</h3>

          <h6>
            <kbd className="kbd">{post.name}</kbd>
          </h6>
          <sub>
            <small>{post.fecha}</small>
          </sub>
        </div>
        <div class="card-body">
          <p class="card-title">{post.descripcion}</p>
        </div>
        <FormComentario />

        <div class="card cardPostLikes " key={like.id}>
          <div class="card-body cardLike">
            <Tippy content={<span style={{ color: "white" }}>Calificar</span>}>
              <form>
                <div
                  onClick={() => {
                    if (!like.find((item) => item.idUsuario === user?.uid)) {
                      fetch(
                        `https://sofkabookbackend.herokuapp.com/apiLike/${uuidv4()}/${
                          user?.uid
                        }/${id}`,
                        {
                          method: "POST",
                        }
                      ).then((response) => {
                        if (response.status === 200) {
                          window.location.reload();
                        }
                      });
                    } else {
                      YaMeGusta();
                    }
                  }}
                >
                  <div className="p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-suit-heart-fill corazon "
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                    </svg>
                    <h5>Me gusta</h5>
                  </div>
                </div>
              </form>
            </Tippy>

            <small> Reacciones: {like.length}</small>
          </div>
        </div>
        <br />
      </div>

      <div className="tituloComentarios">
        <kbd className="kbd">Comentarios</kbd>
      </div>

      {comentarios.map((comentario) => (
        <Comentarios key={comentario.id} comentario={comentario} />
      ))}
      <br />
    </div>
  );
}
