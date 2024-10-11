"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useUser } from "@/app/contexts/UserProviderContext"

export default function Page() { 
  const userContext = useUser();
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(''); // State to manage error messages

  // Check if userContext is null
  if (!userContext) {
    return <div>Loading...</div>; // Handle the null state appropriately
  }

  const { handleGoogleLogin } = userContext; // Access handleGoogleLogin safely

  const handleLoginClick = async () => {
    setIsLoading(true); // Set loading state to true
    setError(''); // Reset error state

    try {
      await handleGoogleLogin(); // Call the Google login function
      // Handle successful login if needed, e.g., redirect or show a message
    } catch (err) {
      console.error("Google login error:", err); // Log error for debugging
      setError("Failed to login with Google. Please try again."); // Set error message
    } finally {
      setIsLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <div className="text-center">
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <button
        className="mx-auto flex bg-slate-800 max-w-[240px] min-w-[240px] px-2 py-1.5 rounded text-white text-lg text-center shadow-md gap-2 items-center"
        onClick={handleLoginClick} // Use handleLoginClick to manage login logic
        disabled={isLoading} // Disable button during loading
      >
        <Image src={"/google.svg"} alt="Google Logo" width={20} height={20} />{" "}
        <span>{isLoading ? 'Logging in...' : 'Continue with Google'}</span> {/* Change button text based on loading state */}
      </button>
    </div>
  );
}
