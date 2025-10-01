"use client";
import { getNewChat } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { useState } from "react";
import { Button } from "../button/button";

function GradiantTextarea({ classNames = "" }: { classNames: string }) {
  // const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const handlePush = async () => {
    await getNewChat(text, dispatch, navigate);
  };

  return (
    <div
      className={`${classNames} h-[150px] relative flex flex-col items-center bg-radial-gradient pt-[1px] pb-[0.5px] px-[1px] rounded-[5px]`}
    >
      <div className=" w-full h-full bg-richblack-990 rounded-[5px] ">
        <div className=" w-full h-full flex flex-row gap-2 items-center rounded-[5px] bg-richblack-900/40 p-4">
          <div className="w-full h-full flex flex-col gap-2">
            <textarea
              placeholder="How can Bolt help you today ?"
              className="focus:outline-none no-scrollbar resize-none w-full h-full text-body2 placeholder:text-richblack-600 bg-richblack-900/0"
              onChange={(e) => {
                setText(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter" && text.length !== 0) {
                  handlePush();
                }
              }}
            ></textarea>
            <div className="flex flex-row gap-1">
              <Button
                isLabel={false}
                isIcon={true}
                iconName="FolderOpen"
                iconWidth={20}
                iconHeight={20}
                iconStrokeWidth={2}
                variant="variant6"
              />
              <Button
                isLabel={false}
                isIcon={true}
                iconName="Figma"
                iconWidth={20}
                iconHeight={20}
                iconStrokeWidth={1.6}
                variant="variant6"
              />
              <Button
                isLabel={false}
                isIcon={true}
                iconName="BsStars"
                iconWidth={20}
                iconStrokeWidth={0.5}
                iconHeight={20}
                variant="variant6"
              />
              <Button
                isLabel={false}
                isIcon={true}
                iconName="IoEarth"
                iconStrokeWidth={0.5}
                iconWidth={20}
                iconHeight={20}
                variant="variant6"
              />
            </div>
          </div>
          <div className="flex flex-col h-full justify-between gap-14">
            <div className="opacity-0">
              <Button
                isLabel={false}
                isIcon={true}
                iconName="ArrowRight"
                iconWidth={20}
                iconHeight={20}
                iconStrokeWidth={2}
                variant="variant2"
              />
            </div>
            <Button
              isLabel={false}
              isIcon={true}
              iconName="FaMicrophone"
              iconWidth={20}
              iconHeight={20}
              iconClassName="p-[2px]"
              variant="variant4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradiantTextarea;
