"use client";

import { Button } from "@/components/ui/button/button";
import AuthPageGradiant from "@/components/ui/custom/AuthPageGradiant";
import Molt_Logo from "@/components/ui/custom/Molt_Logo";
import { Input } from "@/components/ui/input/input";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Auth() {
  return (
    <div className="h-screen pt-[112px] relative ">
      <div className="w-full h-full flex flex-col items-center gap-6">
        <Link href="/">
          <Molt_Logo size="large" />
        </Link>
        <MainSection />
      </div>
      <AuthPageGradiant />
    </div>
  );
}

function MainSection() {
  return (
    <div className="w-[416px] h-[488px] bg-gradient-to-t from-[#3B3B3B50] to-[#1F1F2080] border border-richblack-700/30 rounded flex flex-col gap-8 px-10 py-4">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-heading2 font-lora font-semibold">Welcome back!</h2>
        <p className="text-body1 font-inter text-richblue-300/50 text-center ">
          Access your AI workspace and pick up right where you left off
        </p>
      </div>
      <OAuthButtons />
      <div className="w-full h-[30px] flex items-center justify-evenly gap-[2px]">
        <div className="w-full h-[1px] bg-gradient-to-r from-white/0 via-white/20 to-white/30"></div>
        <p className="text-body1 font-inter ">or</p>
        <div className="w-full h-[1px] bg-gradient-to-r from-white/30 via-white/20 to-white/0"></div>
      </div>
      <EmailSection />
    </div>
  );
}

function OAuthButtons() {
  const { signIn } = useSignIn();

  const signInWithGoogle = () => {
    if (signIn)
      signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
  };
  const signInWithGithub = () => {
    if (signIn)
      signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
  };
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="variant3"
        label="Continue with Google"
        onClick={signInWithGoogle}
        isIcon={true}
        iconName="IoLogoGoogle"
        className="w-full h-11 flex flex-row-reverse"
      />
      <Button
        variant="variant3"
        label="Continue with GitHub"
        onClick={signInWithGithub}
        isIcon={true}
        iconName="IoLogoGithub"
        className="w-full h-11 flex flex-row-reverse"
      />
    </div>
  );
}

function EmailSection() {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Enter your email address" />
      <Button
        variant="variant1"
        label="Send OTP"
        className="w-full h-11 flex flex-row-reverse"
      />
    </div>
  );
}
