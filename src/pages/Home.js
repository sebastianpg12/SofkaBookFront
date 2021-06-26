
import React, { useState, useEffect } from 'react'
import { auth, signOut } from '../fuctions/firebaseFuctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory, Link } from 'react-router-dom'

export default function Home() {

  const [arrayPosts, setArrayPosts] = React.useState([])

  React.useEffect(() => {
    console.log('')
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    const data = await fetch('http://localhost:8080/api/findPosts')
    const posts = await data.json()

    setArrayPosts(posts)
  }


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
          
          <Link to="/CreatePost"><button> Crear Post </button></Link>
          <div>
            <h6 className="namePerson"> {user?.displayName} <img alt="perfil" className="photoProfile" src={user?.photoURL} /></h6>
          </div>
        </div>
      </nav>

      <div class="container-xxl">

        <div class="row">
          {arrayPosts.map(item => (
            <div key='item.id' class="col-6 text-center" >
              <div class="card cardsPosts">
                <div class="card-body">
                  <h5 class="card-title">{item.titulo}</h5>
                  <p class="card-text">{item.descripcion} </p>
                </div>
              </div>
            </div>
          )
          )
          }
        </div>
      </div>

      <button className="btnSignOut btn btn-primary" onClick={signOut} >Cerrar Sesión</button>
    </div>
  )

}