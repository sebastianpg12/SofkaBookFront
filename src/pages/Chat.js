import React from 'react'
import { useChat } from './useChat'
import { db } from "../fuctions/firebaseInit";
import MenuHome from "../components/MenuHome";
import { auth, signOut } from '../fuctions/firebaseFuctions';
import { useAuthState } from 'react-firebase-hooks/auth';

function Chat() {
    const [user] = useAuthState(auth);
    const [message, setMessage] = React.useState('');
    const {loading, messages, error} = useChat();

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('messages').add({
            timestamp: Date.now(),
            message
        });
    }
    return(
       <div>
            <MenuHome />
         
           <form className="card">
           <p>Escribe mensaje</p>
               <input value={message} onChange={(e) => setMessage(e.target.value)} ></input>
               <button type="submit" onClick={sendMessage}>Enviar</button>
           </form>

           <ul className="card">
               {messages.map(m => <li key={m.id}>{m.message}</li>)}
           </ul>
       </div>
    )
}

export default Chat;