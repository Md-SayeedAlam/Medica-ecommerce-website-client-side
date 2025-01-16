import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { Children, createContext, useEffect, useState } from 'react';
import { auth } from '../../Firebase/firebase.config';
import useAxiosPublic from './../useAxiosPublic';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }


    const updateUserProfile=(name,photo)=>{
       return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        })
    }





const authInfo ={
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn
}

useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        console.log('currently logged in',currentUser)
        if(currentUser){
            // get Token and store
            const userInfo = {email:currentUser.email}
            axiosPublic.post('/jwt',userInfo)
            .then(res=>{
                if(res.data.token){
                    localStorage.setItem('ACCESS TOKEN',res.data.token)
                    setLoading(false)
                }
            })
        }else{
            // TODO remove token

            localStorage.removeItem('ACCESS TOKEN')
            setLoading(false)
        }
        
    
    })
    
    return()=>{
        unsubscribe()
    }
},[axiosPublic])




    return (
        <AuthContext.Provider value={authInfo}>
            
        {children}

    </AuthContext.Provider>
    );
};

export default AuthProvider;
