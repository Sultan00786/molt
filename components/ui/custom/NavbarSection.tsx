import Link from "next/link";
import { Button } from "../button/button";
import Molt_Logo from "./Molt_Logo";

function NavbarSection() {
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
          <Button
            variant="variant6"
            isLabel={false}
            isIcon={true}
            iconName="IoLogoGithub"
            iconWidth={28}
            iconHeight={28}
          />
          <div className=" flex gap-2 items-center ">
            <Button variant="variant3" label="Login" />
            <Button variant="variant1" label="Sign Up" />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#8A919980] to-[#2E3133] w-full h-[1px]"></div>
    </div>
  );
}

export default NavbarSection;
