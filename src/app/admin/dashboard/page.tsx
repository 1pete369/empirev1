"use client"

import { FirebaseUserObject } from '@/app/contexts/UserProviderContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function AdminPage() {

    const [users, setUsers] = useState<FirebaseUserObject[] | []>([])

    useEffect(()=>{
        async function getUsers(){
            const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/`)
            setUsers(result.data)
        }
        getUsers()
    },[])

  return (
    <div>
        {
            users?.map((user : FirebaseUserObject,i : number)=>{

               return <div key={i} className="flex justify-between p-4 shadow-md mx-4 rounded-sm">
          <div className="flex gap-1 flex-col leading-8">
            <h2 className="underline">User Details</h2>
            <p>UserName: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
            <p>Uid: {user?.uid}</p>
            <p>CreatedAt: {new Date(user?.createdAt)?.toLocaleDateString()}</p>
            <p>LastLoginAt: {new Date(user?.lastLoginAt)?.toLocaleDateString()}</p>
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
            })
        }
    </div>
  )
}
