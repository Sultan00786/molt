import { InputProps } from "@/types/props/components/input";
import React from "react";

export function Input({
  lable,
  placeholder = "John.Dev@gmail.com",
  value = "",
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label
        className={`text-body1 font-inter text-white ${!lable && "hidden"}`}
      >
        {lable}
      </label>
      <input
        className="p-4 rounded-[5px] bg-[#161617] border border-richblack-700/60 text-body2 font-inter text-white placeholder:text-richblack-600 focus:outline-none focus:border-richblack-700"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
