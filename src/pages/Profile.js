import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link, useParams } from "react-router-dom";
import MenuHome from "../components/MenuHome";
import Menu from "../components/Menu";


export default function Profile() {

    const [user] = useAuthState(auth);

  return (
    <div className="fontGlobal">
      <Menu />
        <div className="cardProfile container-flex">
        <img className="imgProfile" src={user?.photoURL} alt="Avatar"/>
        <div class="containerProfile">
            <br/>
            <b>Persona</b>
            <br/>
            <small>{user?.displayName}</small> 
            <br/>
            <b>Correo</b>
            <br/>
            <small>{user?.email}</small>     
            <br/>
            <br/>
          
        </div>
        </div>
      </div>
    
  );
}


