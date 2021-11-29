import React, { useState, useEffect } from "react";
import { auth, signOut } from "../fuctions/firebaseFuctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import Logo from "./logo.png";
import "../App.css";

export default function Menu() {
  const history = useHistory();
  const [user] = useAuthState(auth);
 
  return (
    <div className="fontGlobal">
      <nav className="navbar navbar-expand-lg navbar-dark navPrincipal">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo}/>

        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" href="#">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/CreatePost" className="nav-link" href="#">
                Crear Post
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Chat" className="nav-link" href="#">
                Grupos
              </Link>
            </li>
          </ul>

          <div className="nav-item">
            <kbd className="name"> {user?.displayName} </kbd>
            <Link to="/Profile">
              <img alt="perfil" className="photoProfile" src={user?.photoURL} />
            </Link>
          </div>

          <li className="nav-item d-flex">
            
          </li>
        </div>
      </div>
    </nav>
    </div>
    
  );
}
