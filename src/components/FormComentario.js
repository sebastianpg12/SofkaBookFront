import React, { useState, useEffect } from 'react'
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import {getCurrentDate} from '../fuctions/util'
import { v4 as uuidv4 } from 'uuid';
export default function FormComentario() {
    const { id } = useParams();
  
    const [comentario, setComentario] = useState("");

    const [user] = useAuthState(auth);
    const saveComment = () => {
        fetch(`https://sofkabookbackend.herokuapp.com/apiComment/${uuidv4()}/${comentario}/${getCurrentDate()}/${id}/${user?.uid}/${user?.displayName}`, { method: 'POST' })
          .then(response => response.json())
          .then(data => console.log(data));
      }    
    
    return(
       <div className="fontGlobal">
        <form>
        <textarea type="text" className="form-control textAreaComment" onChange={(e) => setComentario(e.target.value)} value={comentario} name="comentario" placeholder="Escribe un comentario" />
           <input  className="buttonComentario" type="submit" value="Enviar" onClick={saveComment} />
        </form>
           
       </div>
    )
}

