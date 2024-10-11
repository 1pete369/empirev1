"use client";

import React from "react";
import { useUser } from "../contexts/UserProviderContext";
import Image from "next/image";

export default function Page() {
  const userContext = useUser();

  // Check if userContext is null
  if (!userContext) {
    return <div>Loading...</div>; // or handle the null state appropriately
  }

  const { user, handleLogout } = userContext; // Now we can safely access user and handleLogout

  return (
    <div className="text-lg p-4 w-full">
      Profile page
      {user === null ? (
        <p>User not logged in!</p>
      ) : (
        <div className="flex justify-between p-4 shadow-md mx-4 rounded-sm">
          <div className="flex gap-1 flex-col leading-8">
            <h2 className="underline">User Details</h2>
            <p>UserName: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
            <p>Uid: {user?.uid}</p>
            <p>CreatedAt: {user?.createdAt?.toLocaleDateString()}</p>
            <p>LastLoginAt: {user?.lastLoginAt?.toLocaleDateString()}</p>
            <button
              className="bg-slate-800 p-2.5 max-w-[200px] rounded text-white text-lg text-center shadow-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div>
            {user?.photoURL && (
              <Image
                src={user.photoURL}
                width={40}
                height={40}
                className="rounded-sm"
                alt="User profile picture"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
