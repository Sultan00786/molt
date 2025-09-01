import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CodeXml,
  Crown,
  Figma,
  FilePlus2,
  FolderOpen,
  History,
  Lightbulb,
  LightbulbIcon,
  MonitorSmartphone,
  RotateCw,
  Search,
  SquareDashedMousePointer,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { BsStars } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { IoEarth, IoLogoGithub } from "react-icons/io5";

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
  IoEarth: IoEarth,
  IoLogoGithub: IoLogoGithub,
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
    <div
      // for react-icon
      style={{
        width: `${w}px`,
        height: `${h ?? w}px`,
      }}
    >
      <IconComponent
        // for lucide
        width={w ? w : 16}
        height={h ? h : 16}
        strokeWidth={strokeWidth ? strokeWidth : 1}
        // for react-icon
        style={{
          width: `${w}px`,
          height: `${h ?? w}px`,
          fontSize: `${w}px`,
        }}
        className={className}
      />
      </div>
  );
};
