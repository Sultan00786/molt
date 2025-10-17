"use client";
import ChatSection from "@/components/ui/custom/ChatSection";
import FileManager from "@/components/ui/custom/files/FileManager";
import Priview from "@/components/ui/custom/webContainer/Priview";
import { files } from "@/lib/temp";
import { convertToWebcontainerFiles } from "@/lib/webContainer/covertWebcontainerFiles";
import { runWebContainer } from "@/lib/webContainer/runWebContainer";
import { FileItem } from "@/types/prompt";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Project() {
  // const template = useAppSelector((state) => state.code.chatCode ?? []);
  const template = files;
  console.log("template", template);

  const file = template.find((file) => file.type === "file");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(
    file ?? null
  );
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function needToRunWebcontainer() {
      setIsLoading(true);
      const mountStructur = convertToWebcontainerFiles(template);
      console.log(mountStructur);
      await runWebContainer(mountStructur, dispatch);
      setIsLoading(false);
    }
    needToRunWebcontainer();
  }, []);

  if (file === undefined || selectedFile === null)
    return <div>File is null</div>;
  return (
    <div className="h-screen w-full relative z-40 overflow-hidden pb-7">
      {/* <div className="h-fit "></div> */}
      <div className=" h-full flex gap-[10px] rounded-full px-6 pb-6 pt-1">
        <ChatSection />
        <div className="w-[4px] h-full bg-[#D9D9D9]/40 rounded-full"></div>
        <div className="w-full h-full flex">
          <FileManager files={template} setSelectedFile={setSelectedFile} />
          <div className=" w-full h-full">
            <div className="w-full h-8 bg-richblack-900 border-b-1 border-richblack-800"></div>
            {/* <MonacoCodeEditor
              key={selectedFile.title}
              selectedFile={selectedFile}
            /> */}
            <Priview isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
