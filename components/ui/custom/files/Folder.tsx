import { FolderProps } from "@/types/props/fileManager";
import { AiFillFolder } from "react-icons/ai";
import { RenderFilesv } from "./RenderFiles";
import { useState } from "react";

function FolderComponent({ file, spacing, setSelectedFile }: FolderProps) {
  const leftSpacing = spacing * 8;
  console.log(spacing);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  return (
    <div className="">
      <div
        className={`h-5 flex items-center gap-1 hover:bg-richblack-500/30 cursor-pointer `}
        style={{ paddingLeft: `${leftSpacing}px` }}
        onClick={() => setIsFolderOpen(!isFolderOpen)}
      >
        <AiFillFolder width={14} height={14} />
        <p className="text-body2 h-[18px] ">{file.title}</p>
      </div>
      {isFolderOpen && (
        <div>
          {file.children.length > 0 && (
            <RenderFilesv
              files={file.children}
              setSelectedFile={setSelectedFile}
              spacing={spacing}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default FolderComponent;
