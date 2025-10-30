"use client";
import Image from "next/image";

import { useSignIn } from "@clerk/nextjs";

export default function CustomOAuth() {
  const { signIn } = useSignIn();

  const signInWithGoogle = () => {
    if (signIn)
      signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center gap-2 px-6 py-3 bg-white border rounded-lg hover:shadow-lg"
    >
      <Image
        src="/google-icon.svg"
        alt="Google"
        className="w-5 h-5"
        width={20}
        height={20}
      />
      Continue with Google
    </button>
  );
}
