"use client";

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter for client-side redirects
import RegisterWithGoogle from "../../components/registerform/RegisterWithGoogle";
import RegisterWithForm from "../../components/registerform/RegisterWithForm";
import { useUser } from "@/app/contexts/UserProviderContext";

export default function RegisterPage() {
  const { push } = useRouter(); // Initialize useRouter
  const userContext = useUser();

  // Instead of returning early, we can use a loading state to render the loading message
  const isLoading = !userContext;

  // Destructure user safely
  const { user } = userContext || {}; 

  useEffect(() => {
    if (user !== null) {
      push('/profile'); // Use router push to redirect client-side
    }
  }, [user, push]);

  // Show loading state until userContext is available
  if (isLoading) {
    return <div>Loading...</div>; // Handle null state appropriately
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] bg-stone-50 p-4 gap-5">
      <h1 className="text-lg">Create an account!</h1>
      <RegisterWithForm />
      <p className="text-lg bold">or</p>
      <RegisterWithGoogle />
    </div>
  );
}
