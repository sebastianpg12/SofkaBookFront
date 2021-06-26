import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import MenuHome from "../components/MenuHome";
import FormComentario from "../components/FormComentario";


export default function Post() {
  const { id } = useParams();
  

  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
    const obtenerDatos = async () => {
      const data = await fetch(`http://localhost:8080/api/findPosts/${id}`);
      const posts = await data.json();

      setPost(posts);
    };
    obtenerDatos();
  }, [id]);

  return (
    <div>
      <MenuHome />

      <div class="card">
        <div class="card-header">
          <h6>{post.titulo}</h6>
        </div>
        <div class="card-body">
          <h5 class="card-title">
            {" "}
            <p>{post.descripcion}</p>
          </h5>

          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>

      </div>

      <FormComentario />
    </div>
  );
}
