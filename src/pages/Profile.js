import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import MenuHome from "../components/MenuHome";


export default function Profile() {

    const [user] = useAuthState(auth);

  return (
    <div>
      <MenuHome />
        <div className="cardProfile container">
        <img className="imgProfile" src={user?.photoURL} alt="Avatar"/>
        <div class="containerProfile">
            <br/>
            <p><b>Sofkian@:</b>{user?.displayName}</p> 
            <p><b>Correo:</b>{user?.email}</p>     
        </div>
        </div>
      </div>
    
  );
}


