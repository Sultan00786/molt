import { FolderProps } from "@/types/props/fileManager";
import { AiFillFolder } from "react-icons/ai";
import { RenderFilesv } from "./RenderFiles";

function FolderComponent({ file, spacing }: FolderProps) {
  const leftSpacing = spacing * 8;
  return (
    <div className="">
      <div className="h-5 flex items-center gap-1 ">
        <AiFillFolder width={14} height={14} />
        <p className="text-body2 h-[18px] ">{file.title}</p>
      </div>
      <div style={{ paddingLeft: leftSpacing }}>
        {file.children.length > 0 && (
          <RenderFilesv files={file.children} spacing={spacing} />
        )}
      </div>
    </div>
  );
}

export default FolderComponent;
