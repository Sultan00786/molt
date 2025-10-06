import { RenderFileProps } from "@/types/props/fileManager";
import File from "./File";
import Folder from "./Folder";

export const RenderFilesv = ({ files, spacing }: RenderFileProps) => {
  return (
    <div className="pl-2">
      {files.map((file, index) => {
        if (file.type === "folder") {
          return <Folder key={index} spacing={spacing + 1} file={file} />;
        } else if (file.type === "shell") return <></>;
        else return <File key={index} file={file} />;
      })}
    </div>
  );
};
