
import React, { useState, useEffect } from 'react'
import { auth, signOut } from '../fuctions/firebaseFuctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory, Link } from 'react-router-dom'

export default function Home() {
    const history = useHistory();
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (!user) {
            history.push("/Login");
        }
    }, [user, history])
    return (
        <div>
                <nav className="navPrincipal navbar navbar-expand-lg navbar-dark" >
        <div className="container-fluid">
        
          <img width="160px" height="30px" src="https://d3j0t7vrtr92dk.cloudfront.net/sofkauniversity/1613419253_SofkaU_Prueba3.png?" />
          <Link to="/CreatePost">Crear Post</Link>
          <div>

            <h6 className="namePerson"> {user?.displayName} <img alt="perfil" className="photoProfile" src={user?.photoURL} /></h6>
          </div>

        </div>
      </nav>
      
            <button className="btnSignOut btn btn-primary" onClick={signOut} >Cerrar Sesión</button>
        </div>
    )

}