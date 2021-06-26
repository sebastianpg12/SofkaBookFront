
import React, { useState, useEffect } from 'react'
import { auth, signOut } from '../fuctions/firebaseFuctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory, Link } from 'react-router-dom'
import MenuHome from '../components/MenuHome';
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
    
    <MenuHome />

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
      <button type="button" class="btn btn-outline-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
        </svg>

      </button>
      <button className="btnSignOut btn btn-primary" onClick={signOut} >Cerrar Sesión</button>
    </div>
  )

}