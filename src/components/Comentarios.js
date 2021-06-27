import React from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Comentarios({comentario}) {
    const [user] = useAuthState(auth);
  return (
    <div className="">
      <div class="card cardComments">
        <div class="card-header"> <h5 class="card-title">{comentario.name}</h5></div>
        <div class="card-body">
           <p class="card-text">
           {comentario.comentario}
          </p>
          {comentario.idUsuario === user?.uid ? (
                    <button type="button" className="buttons btn btn-dark"
                      onClick={() => {
                        fetch(`http://localhost:8080/apiComment/delete/${comentario.id}`, {
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
        </div>
      </div>
    </div>
  );
}
