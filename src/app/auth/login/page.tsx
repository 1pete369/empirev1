"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import Image from 'next/image';

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    onAuthStateChanged(auth, (currentUser) => {
      if (isSubscribed) {
        setUser(currentUser);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] bg-stone-50 p-4">
      {/* Subtract the navbar height from the screen */}
      <div className="text-center">
        {user ? (
          <button
            className="mx-auto bg-slate-800 max-w-[200px] p-2.5 rounded text-white text-lg text-center shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="mx-auto bg-slate-800 max-w-[200px] p-2.5 rounded text-white text-lg text-center shadow-md"
            onClick={handleLogin}
          >
            Continue with Google
          </button>
        )}
        <div className="mt-10">
          {user !== null && (
            <div>
              <h2>User Details</h2>
              <p>UserName: {user?.displayName}</p>
              <p>Email: {user?.email}</p>
              {user?.photoURL && (
                <Image
                  src={user.photoURL}
                  width={40}
                  height={40}
                  className="rounded"
                  alt="User profile picture"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
