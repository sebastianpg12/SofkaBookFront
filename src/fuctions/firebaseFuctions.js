import firebase from "./firebaseInit";
import "firebase/auth"

export const auth = firebase.auth();
export const signingWithGoogle = () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
}

export const signOut = () => {
    auth.signOut();
    window.location.reload();
  
}
