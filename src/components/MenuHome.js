import React, { useState, useEffect } from 'react'
import { auth, signOut } from '../fuctions/firebaseFuctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory, Link } from 'react-router-dom'

import '../App.css';

export default function MenuHome() {

    const history = useHistory();
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (!user) {
            history.push("/Login");
        }
    }, [user, history])
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navPrincipal">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img width="160px" height="30px" src="https://d3j0t7vrtr92dk.cloudfront.net/sofkauniversity/1613419253_SofkaU_Prueba3.png?" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/CreatePost" className="nav-link" href="#">Crear Post</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-primary" type="submit">Buscar</button>
                        <input className="form-control me-2" type="search" placeholder="Titulo post" aria-label="Search" />

                    </form>
                    <li className="nav-item d-flex">

                        <Link className="nav-link">{user?.displayName}</Link>
                        <h6 className="namePerson me-2"> <img alt="perfil" className="photoProfile" src={user?.photoURL} /></h6>
                    </li>

                    <li className="nav-item d-flex">

                     
                        <button type="button" class="btn btn-outline-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>

                        </button>
                    </li>


                </div>
            </div>
        </nav>
    )
}

