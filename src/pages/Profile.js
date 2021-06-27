import React, { useState, useEffect } from 'react'
import { auth, signOut } from '../fuctions/firebaseFuctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory, Link } from 'react-router-dom'
import MenuHome from "../components/MenuHome";

export default function Profile() {
    
    const history = useHistory();
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (!user) {
            history.push("/Login");
        }
    }, [user, history])
    
    return(
   
           
<div>
<MenuHome />
</div>
       
    )
}

