import React, { useEffect } from 'react';
import { signingWithGoogle, auth } from '../fuctions/firebaseFuctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

import MenuLogin from '../components/MenuLogin';
import SofkaBook from '../components/a.png';


export default function Login() {
  
    const history = useHistory();
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, [user, history])

    return (
        <div className="fontGlobal">
            <MenuLogin/>
        
<div className="container-fluid">
<div class="row">
<div className="card card-login">

<div className="card-body ">
    <div className="card-title"><img  width="150" height="70" src={SofkaBook} /></div>
    <br />
    <p className="card-text">Estamos construyendo la mejor experiencia social para ti, esperamos disfrutes de las distintas utilidades.
        <br /><br />
    </p>


</div>
<button className="myButton" onClick={signingWithGoogle} ><img src="https://cdn.icon-icons.com/icons2/836/PNG/512/Google_icon-icons.com_66793.png" width="17px" height="15px"/> Ingresar con Google </button>
</div>
    </div>
          
</div>




        </div>
    )
}