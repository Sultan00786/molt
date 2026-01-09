import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types/props/components/botton";

export function Button({
  label,
  iconWidth,
  iconHeight,
  iconName,
  isLabel = true,
  isIcon = false,
  variant = "variant1",
  iconClassName = "",
  iconStrokeWidth,
  onClick,
  className,
}: ButtonProps) {
  return (
    <div
      className={cn(
        "w-fit flex items-center justify-center gap-[10px] cursor-pointer rounded-[5px] transition duration-200",
        variant === "variant1" &&
          "bg-richblue-500/80 hover:bg-richblue-500 py-1 px-2 ",
        variant === "variant2" &&
          "bg-richblue-500/80 hover:bg-richblue-500 py-1 px-1",
        variant === "variant3" &&
          " bg-richblack-500/25 hover:bg-richblack-500/50 py-1 px-2",
        variant === "variant4" &&
          "bg-richblack-500/25 hover:bg-richblack-500/50 py-1 px-1",
        variant === "variant5" && "py-1 px-2",
        variant === "variant6" && "py-1 px-1",
        className
      )}
      onClick={onClick}
    >
      {isLabel && (
        <div
          className={cn(
            " text-white font-inter text-center ",
            (variant === "variant1" ||
              variant === "variant3" ||
              variant === "variant5") &&
              "text-body2",
            (variant === "variant2" ||
              variant === "variant4" ||
              variant === "variant6") &&
              "text-body3"
          )}
        >
          {label}
        </div>
      )}
      {isIcon && iconName && (
        <div>
          <Icon
            w={iconWidth ? iconWidth : 16}
            h={iconHeight ? iconHeight : 16}
            iconName={iconName || "Crown"}
            strokeWidth={iconStrokeWidth ? iconStrokeWidth : 1}
            className={`
              transition duration-200
              ${iconClassName} 
              ${
                variant === "variant6" || variant === "variant5"
                  ? "text-white/55 hover:text-white"
                  : "text-white"
              }`}
          />
        </div>
      )}
    </div>
  );
}

// export function OAuthButton () {

// }
