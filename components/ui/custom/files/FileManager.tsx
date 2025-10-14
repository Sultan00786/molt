import { FileManagerProps } from "@/types/props/fileManager";
import { RenderFilesv } from "./RenderFiles";

function FileManager({ files, setSelectedFile }: FileManagerProps) {
  return (
    <div className="w-[30%] border-r-1 bg-richblack-900 border-richblack-800 ">
      <div className="w-full h-8 bg-richblack-900 border-b-1 border-richblack-800"></div>
      <div className="wfull h-full">
        <RenderFilesv
          files={files}
          spacing={0}
          setSelectedFile={setSelectedFile}
        />
      </div>
    </div>
  );
}

export default FileManager;
