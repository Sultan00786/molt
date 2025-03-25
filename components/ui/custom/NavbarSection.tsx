import { Button } from "@heroui/button";
import { Noto_Sans } from "next/font/google";
import { DiGithubAlt } from "react-icons/di";
import { FaBolt } from "react-icons/fa";

const geistSans = Noto_Sans({
  weight: "600",
  subsets: ["latin"],
});

function NavbarSection() {
  return (
    <div className="flex items-center justify-between px-2 py-3 fix">
      <div className="flex items-center gap-1 text-white">
        <FaBolt className="text-4xl" />
        <h1 className={` -m-3 text-3xl font-extrabold ${geistSans.className}`}>
          <i>bolt</i>
        </h1>
      </div>
      <div className=" flex gap-1 items-center ">
        <Button isIconOnly variant="flat" className=" bg-transparent">
          <div className="text-3xl ml-3">
            <DiGithubAlt />
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
