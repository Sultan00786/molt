import Link from "next/link";
import { Button } from "../button/button";
import Molt_Logo from "./Molt_Logo";
import { NavUser } from "./user/user";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function ProjectNavbar() {
  const { user } = useUser();
  const router = useRouter();
  if (!user) router.push("/auth");
  return (
    <div className="h-10 flex flex-col items-center justify-between  z-50">
      <div className=" w-full h-[calc(100%-1px)] flex items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-1 text-white cursor-pointer"
        >
          <Molt_Logo />
        </Link>
        <div className="flex gap-1">
          <NavUser imageUrl={user?.imageUrl} />
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#8A919980] to-[#2E3133] w-full h-[1px]"></div>
    </div>
  );
}

export default ProjectNavbar;
