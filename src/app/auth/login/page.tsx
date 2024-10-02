"use client"

import React, { useEffect, useState } from "react"
import { auth } from "../../firebase/config"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth"

export default function page() {

    const [user, setUser] = useState<User | null>(null)

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err) {
      alert(err)
    }
  }

  const handleLogout=async()=>{
    try{
        await signOut(auth)
        setUser(null)
    }catch(err){
        alert(err)
    }
  }

  useEffect(() => {
    let isSubscribed = true; // Prevent side effects after unmount

    onAuthStateChanged(auth, async (currentUser) => {
      if (isSubscribed && currentUser) {
        setUser(currentUser);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <div className="h-screen grid content-center bg-stone-50 p-4">
        {
            user ? <button
            className="mx-auto bg-slate-800 max-w-[200px] p-2.5 rounded text-white text-lg text-center shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button> :
      <button
      className="mx-auto bg-slate-800 max-w-[200px] p-2.5 rounded text-white text-lg text-center shadow-md"
      onClick={handleLogin}
      >
        Continue with Google
      </button>
    }
      <div className="mt-10">
        {user != null && <div>
        UserName : {user?.displayName}
        <br />
        Email : {user?.email}
        <br />
        Profile : <img src={user?.photoURL as string} className="h-10 rounded" />
        </div>
        }
      </div>
    </div>
  )
}
