import {
  FolderOpen,
  FilePlus2,
  Figma,
  ArrowRight,
  Crown,
  Bookmark,
  ThumbsDown,
  ThumbsUp,
  RotateCw,
  Lightbulb,
  ArrowUpRight,
  Search,
  MonitorSmartphone,
  ArrowDown,
  CodeXml,
  LightbulbIcon,
  SquareDashedMousePointer,
  History,
} from "lucide-react";
import { BsStars, BsGithub } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";

export const iconsObj = {
  FolderOpen: FolderOpen,
  FilePlus2: FilePlus2,
  Figma: Figma,
  SquareDashedMousePointer: SquareDashedMousePointer,
  LightbulbIcon: LightbulbIcon,
  ArrowRight: ArrowRight,
  Crown: Crown,
  History: History,
  Bookmark: Bookmark,
  ThumbsDown: ThumbsDown,
  ThumbsUp: ThumbsUp,
  RotateCw: RotateCw,
  Lightbulb: Lightbulb,
  ArrowUpRight: ArrowUpRight,
  Search: Search,
  MonitorSmartphone: MonitorSmartphone,
  CodeXml: CodeXml,
  ArrowDown: ArrowDown,
  FaMicrophone: FaMicrophone,
  BsStars: BsStars,
  BsGithub: BsGithub,
  IoEarth: IoEarth,
};

export type IconName = keyof typeof iconsObj;

export const Icon = ({
  w = 16,
  h = 16,
  iconName,
  strokeWidth = 1,
  className,
}: {
  w?: number;
  h?: number;
  iconName: IconName;
  strokeWidth?: number;
  className?: string;
}) => {
  const IconComponent = iconsObj[iconName];
  return (
    <div>
      <IconComponent
        width={w ? w : 16}
        height={h ? h : 16}
        strokeWidth={strokeWidth ? strokeWidth : 1}
        className={className}
      />
      {/* <IoEarth width={w} height={h} strokeWidth={2} />  
      <Crown width={w} height={h} strokeWidth={2} /> */}
    </div>
  );
};
