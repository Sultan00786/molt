import { IconName } from "@/components/icons";
import { HTMLAttributes } from "react";

export type ButtonProps = {
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
  className?: HTMLAttributes<HTMLElement>["className"];
  onClick?: HTMLAttributes<HTMLElement>["onClick"];
};
