"use client"

import React, { useEffect, useState } from "react"
import { auth } from "../../firebase/config"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth"
import Image from 'next/image' // Import Next.js Image component

// Component name should start with an uppercase letter
export default function Page() {  
    const [user, setUser] = useState<User | null>(null) // Initialize with null

    const handleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
        } catch (err) {
            alert(err)
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth)
            setUser(null) // Reset user state on logout
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        let isSubscribed = true; // Prevent side effects after unmount

        onAuthStateChanged(auth, async (currentUser) => {
            if (isSubscribed) {
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
                user ? (
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
                )
            }
            <div className="mt-10">
                {user === null ? (
                    <h1>Loading...</h1>
                ) : (
                    <div>
                        <h2>User Details</h2>
                        <p>UserName: {user?.displayName}</p>
                        <p>Email: {user?.email}</p>
                        {/* Use Next.js Image component for optimization and add alt attribute */}
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
    )
}
