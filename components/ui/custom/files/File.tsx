import { FileProps } from "@/types/props/fileManager";
import { FileText } from "lucide-react";

function FileComponent({ file, spacing, setSelectedFile }: FileProps) {
  const leftSpacing = spacing * 8;
  return (
    <div
      className={`h-5 flex items-center gap-1 hover:bg-richblack-500/25 cursor-pointer ${
        spacing === 1 && "pl-2"
      }`}
      style={{ paddingLeft: `${leftSpacing}px` }}
      onClick={() => setSelectedFile((prev) => file)}
    >
      <FileText width={14} height={14} strokeWidth={1.5} />
      <p className="text-body2 h-[18px] ">{file.title}</p>
    </div>
  );
}

export default FileComponent;
