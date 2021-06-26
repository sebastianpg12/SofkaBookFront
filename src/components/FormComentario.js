import React, { useState, useEffect } from 'react'
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import {getCurrentDate} from '../fuctions/util'
import { v4 as uuidv4 } from 'uuid';
export default function FormComentario() {
    const { id } = useParams();
    console.log(id);
    const [comentario, setComentario] = useState("");

    const [user] = useAuthState(auth);
    const saveComment = () => {
        fetch(`http://localhost:8080/apiComment/${uuidv4()}/${comentario}/${getCurrentDate()}/${id}/${user?.uid}/${user?.displayName}`, { method: 'POST' })
          .then(response => response.json())
          .then(data => console.log(data));
      }    
    
    return(
       <div>
           
           <input type="text" className="form-control" onChange={(e) => setComentario(e.target.value)} value={comentario} name="comentario" placeholder="comentario" />
           <input type="submit" value="Guardar" onClick={saveComment} />
       </div>
    )
}

