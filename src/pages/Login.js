import React, { useEffect } from 'react';
import { signingWithGoogle, auth } from '../fuctions/firebaseFuctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

import MenuLogin from '../components/MenuLogin';


export default function Login() {
  
    const history = useHistory();
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, [user, history])

    return (
        <div className="containerLogin">
            <MenuLogin/>
        

            <div className="card">

                <div className="card-body">
                    <h5 className="card-title">Bienvenido a SofkaBook</h5>
                    <br />
                    <p className="card-text">Estamos construyendo la mejor experiencia de aprendizaje para ti, esperamos disfrutes de los cursos que encontrarás en el Campus de Sofka U.
                        <br /><br />
                    </p>

                    <p className="desafioContigo">#ElDesafíoEsContigo</p>

                </div>
                <button className="btnGoogle btn btn-primary" onClick={signingWithGoogle} ><img src="https://cdn.icon-icons.com/icons2/836/PNG/512/Google_icon-icons.com_66793.png" width="17px" height="15px"/>Ingresar con Google </button>
            </div>




        </div>
    )
}