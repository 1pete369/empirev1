// page.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@/app/contexts/UserProviderContext";

export default function Page() {
  const userContext = useUser();

  // Check if userContext is null
  if (!userContext) {
    return <div>Loading...</div>; // or handle the null state appropriately
  }

  const { handleGoogleLogin } = userContext; // Now we can safely access handleGoogleLogin

  return (
    <div className="text-center">
      <button
        className="mx-auto flex bg-slate-800 max-w-[240px] min-w-[240px] px-2 py-1.5 rounded text-white text-lg text-center shadow-md gap-2 items-center"
        onClick={handleGoogleLogin}
      >
        <Image src={"/google.svg"} alt="google svg" width={20} height={20} />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}
