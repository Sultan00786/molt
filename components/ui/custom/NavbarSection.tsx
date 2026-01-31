"use client";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../button/button";
import Molt_Logo from "./Molt_Logo";
import { NavUser } from "./user/user";

function NavbarSection() {
  const { isSignedIn } = useUser();
  return (
    <div className="h-16 flex flex-col items-center justify-between  z-50">
      <div className=" w-full h-full flex items-center justify-between px-14">
        <Link
          href="/"
          className="flex items-center gap-1 text-white cursor-pointer"
        >
          <Molt_Logo />
        </Link>
        <div className="flex gap-1">
          {!isSignedIn && (
            <Button
              variant="variant6"
              isLabel={false}
              isIcon={true}
              iconName="IoLogoGithub"
              iconWidth={28}
              iconHeight={28}
            />
          )}
          <AuthButtons />
        </div>
      </div>
      {/* <div className="bg-gradient-to-r from-[#8A919980] to-[#2E3133] w-full h-[1px]"></div> */}
    </div>
  );
}

export default NavbarSection;

function AuthButtons() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  function authRouterHandler() {
    router.push("/auth");
  }
  return (
    <div className=" flex gap-2 items-center ">
      {isSignedIn ? (
        <div className="flex gap-2">
          <NavUser imageUrl={user.imageUrl} />
          <SignOutButton>
            <Button variant="variant4" label="Sign Out" />
          </SignOutButton>
        </div>
      ) : (
        <Button
          variant="variant4"
          label="Sign In"
          onClick={authRouterHandler}
        />
      )}
    </div>
  );
}
