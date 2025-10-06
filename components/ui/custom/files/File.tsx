import { FileProps } from "@/types/props/fileManager";
import { FileText } from "lucide-react";

function FileComponent({ file }: FileProps) {
  return (
    <div className="h-5 flex items-center gap-1 ">
      <FileText width={14} height={14} strokeWidth={1.5} />
      <p className="text-body2 h-[18px] ">{file.title}</p>
    </div>
  );
}

export default FileComponent;
