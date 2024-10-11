"use client";

import { useUser } from '@/app/contexts/UserProviderContext';
import Link from 'next/link';
import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useUser();

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { handleEmailLogin, error } = userContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    setIsLoading(true);

    try {
      await handleEmailLogin(email, password);
    } catch (err) {
      console.error("Login error:", err);
      // Handle specific error messages if necessary
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-6 items-center shadow-md rounded-sm box-border'>
      {error && <p className="text-red-500">{error}</p>}
      <div className='flex gap-6 items-center justify-center'>
        <label htmlFor="email" className='hidden'>Email:</label>
        <input
          required
          type="email"
          id='email'
          className='rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1.5 placeholder:text-stone-500 text-black min-w-60'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='flex gap-6 items-center justify-center'>
        <label htmlFor="password" className='hidden'>Password:</label>
        <input
          required
          type="password"
          id='password'
          className='rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1.5 placeholder:text-stone-500 text-black min-w-60'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button 
        type='submit' 
        className='rounded-sm bg-sky-500 text-sky-100 px-2 py-1.5 flex-1 min-w-60'
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <p>Don&apos;t have an account? <span className='text-sm text-sky-500 underline'><Link href={"/auth/register"}>Sign Up</Link></span></p>
    </form>
  );
}
