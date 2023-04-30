import React, { useState } from 'react'
import {auth,googleProvider} from "../firebase"
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from "firebase/auth"


const Auth = () => {

    const [email,setEmail] =  useState(" ");
    const [password, setPassword] = useState (" ") ;

    console.log(auth?.currentUser?.email)

    const signIn = async() =>{
        try {
            await  createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
        
    };

    const signInwithGoogle = async() =>{
        try {
            await  signInWithPopup(auth,googleProvider);
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async() =>{
        try {
            await  signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }
    
   


  return (
    <div>
      <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/>
      <button onClick={signIn}>Sign IN</button>

      <button onClick={signInwithGoogle}>Sign IN with Google</button>

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Auth
