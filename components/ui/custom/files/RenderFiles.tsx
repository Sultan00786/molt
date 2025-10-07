import { RenderFileProps } from "@/types/props/fileManager";
import File from "./File";
import Folder from "./Folder";

export const RenderFilesv = ({
  files,
  spacing,
  setSelectedFile,
}: RenderFileProps) => {
  return (
    <div className="">
      {files.map((file, index) => {
        if (file.type === "folder") {
          return (
            <Folder
              key={index}
              spacing={spacing + 1}
              setSelectedFile={setSelectedFile}
              file={file}
            />
          );
        } else if (file.type === "shell") return <></>;
        else
          return (
            <File
              key={index}
              spacing={spacing + 1}
              setSelectedFile={setSelectedFile}
              file={file}
            />
          );
      })}
    </div>
  );
};
