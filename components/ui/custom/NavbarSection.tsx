import { Button } from "@heroui/button";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";
import { FaBolt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const geistSans = Noto_Sans({
  weight: "600",
  subsets: ["latin"],
});

function NavbarSection() {
  return (
    <div className="flex items-center justify-between px-2 py-3 fixed top-0 left-0 right-0 z-50 ">
      <Link
        href="/"
        className="flex items-center gap-1 text-white cursor-pointer"
      >
        <FaBolt className="text-4xl" />
        <h1 className={` -m-3 text-3xl font-extrabold ${geistSans.className}`}>
          <i>bolt</i>
        </h1>
      </Link>
      <div className=" flex gap-1 items-center ">
        <Button
          isIconOnly
          variant="flat"
          className=" bg-transparent hover:text-white text-gray-300/80"
        >
          <div className="text-2xl ml-2">
            <FaGithub />
          </div>
        </Button>
        <Button size="sm" className=" py-2 bg-gray-700/60 hover:bg-gray-600/80">
          Sing In
        </Button>
        <Button
          size="sm"
          color="primary"
          className="bg-blue-500/80 hover:bg-blue-600"
        >
          Get started
        </Button>
      </div>
    </div>
  );
}

export default NavbarSection;
