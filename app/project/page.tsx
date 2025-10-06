"use client";
import MonacoCodeEditor from "@/components/ui/code/MonacoCodeEditor";
import ChatSection from "@/components/ui/custom/ChatSection";
import FileManager from "@/components/ui/custom/files/FileManager";
import { useAppSelector } from "@/store";

function Project() {
  const template = useAppSelector((state) => state.code.template);
  console.log("template", template);
  return (
    <div className="h-screen w-full relative z-40 overflow-hidden pb-7">
      {/* <div className="h-fit "></div> */}
      <div className=" h-full flex gap-[10px] rounded-full px-6 pb-6 pt-1">
        <ChatSection />
        <div className="w-[4px] h-full bg-[#D9D9D9]/40 rounded-full"></div>
        <div className="w-full h-full flex">
          <FileManager />
          <div className=" w-full h-full">
            <div className="w-full h-8 bg-richblack-900 border-b-1 border-richblack-800"></div>
            <MonacoCodeEditor />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
