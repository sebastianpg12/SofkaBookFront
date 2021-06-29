import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import MenuHome from "../components/MenuHome";
import FormComentario from "../components/FormComentario";
import Comentarios from "../components/Comentarios";

export default function Post() {
  const { id } = useParams();

  const [post, setPost] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  const obtenerComentarios = async () => {
    const data = await fetch(`http://localhost:8080/api/findComments/${id}`);
    const comentarios = await data.json();
    setComentarios(comentarios);
  };


  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await fetch(`http://localhost:8080/api/findPosts/${id}`);
      const posts = await data.json();
      setPost(posts);
    };
    obtenerDatos();
    obtenerComentarios();
    
  }, [id]);
  console.log(comentarios)
  return (
    <div>
      <MenuHome />

      <div class="card cardPostIndividual">
        <div class="card-header">
          <h3>{post.titulo}</h3>
         
                  <h6><kbd className="kbd">{post.name}</kbd></h6>
                  <sub><small>{post.fecha}</small></sub>
        </div>
        <div class="card-body">
        
            <p class="card-title">{post.descripcion}</p>
        

         
        </div>
        <FormComentario />
        
      </div>

      <div className="tituloComentarios"><kbd className="kbd">Comentarios</kbd></div>

      {comentarios.map((comentario )=>(
        <Comentarios key={comentario.id} comentario={comentario}/>
      ))
        
      }
      
      
    </div>
  );
}
