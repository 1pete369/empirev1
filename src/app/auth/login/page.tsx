"use client";

import React, { useEffect } from "react";
import LoginWithForm from "../../components/loginform/LoginWithForm";
import LoginWithGoogle from "../../components/loginform/LoginWithGoogle";
import { redirect } from "next/navigation"; // Import redirect from next/navigation
import { useUser } from "@/app/contexts/UserProviderContext";

export default function LoginPage() {
  const userContext = useUser();

  // Check if userContext is null
  // Instead of returning early, we can use a loading state to render the loading message
  const isLoading = !userContext;

  const { user } = userContext || {}; // Destructure user safely

  useEffect(() => {
    if (user !== null) {
      redirect('/profile'); // Redirect if the user is logged in
    }
  }, [user]);

  // Show loading state until userContext is available
  if (isLoading) {
    return <div>Loading...</div>; // or handle the null state appropriately
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] bg-stone-50 p-4 gap-5">
      <h1 className="text-lg">Login to your account!</h1>
      <LoginWithForm />
      <p className="text-lg bold">or</p>
      <LoginWithGoogle />
    </div>
  );
}
