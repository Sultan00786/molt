import { Icon, IconName } from "@/components/icons";
import { FC, HTMLAttributes } from "react";

type ButtonProps = {
  label?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconStrokeWidth?: number;
  iconName?: IconName;
  iconClassName?: HTMLAttributes<HTMLElement>["className"];
  isLabel?: boolean;
  isIcon?: boolean;
  variant?:
    | "variant1"
    | "variant2"
    | "variant3"
    | "variant4"
    | "variant5"
    | "variant6";
};

export const Button: FC<ButtonProps> = ({
  label,
  iconWidth,
  iconHeight,
  iconName,
  isLabel = true,
  isIcon = false,
  variant = "variant1",
  iconClassName = "",
  iconStrokeWidth,
}) => {
  return (
    <div
      className={`
        flex items-center gap-[10px] cursor-pointer rounded-[5px] transition duration-250
        ${
          variant === "variant1" &&
          "bg-richblue-500/80 hover:bg-richblue-500 py-1 px-2 "
        }
        ${
          variant === "variant2" &&
          "bg-richblue-500/80 hover:bg-richblue-500 py-1 px-1"
        }
        ${
          variant === "variant3" &&
          " bg-richblack-500/25 hover:bg-richblack-500/40 py-1 px-2"
        }
        ${
          variant === "variant4" &&
          "bg-richblack-500/25 hover:bg-richblack-500/40 py-1 px-1"
        }
        ${variant === "variant5" && "py-1 px-2"}
        ${variant === "variant6" && "py-1 px-1"}
      `}
    >
      {isLabel && (
        <div
          className={` 
            text-white font-inter
            ${
              (variant === "variant1" ||
                variant === "variant3" ||
                variant === "variant5") &&
              "text-body1"
            }
            ${
              (variant === "variant2" ||
                variant === "variant4" ||
                variant === "variant6") &&
              "text-body3"
            }
          `}
        >
          {label}
        </div>
      )}
      {isIcon && iconName && (
        <div className={``}>
          <Icon
            w={iconWidth ? iconWidth : 16}
            h={iconHeight ? iconHeight : 16}
            iconName={iconName || "Crown"}
            strokeWidth={iconStrokeWidth ? iconStrokeWidth : 1}
            className={`${iconClassName} ${
              variant === "variant6" || variant === "variant5"
                ? "text-white/50 hover:text-white"
                : "text-white"
            }`}
          />
        </div>
      )}
    </div>
  );
};
