"use client";
import { fetchTemplate } from "@/service/operations/fetchTemplate";
import { Button } from "@heroui/button";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

function GradiantTextarea({ classNames = "" }: { classNames: string }) {
  // const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");
  const handleTextAreaChange = async () => {
    const templateResponse = await fetchTemplate(text);
    console.log(templateResponse);
    if (templateResponse == null) return;

    // todo hit chat endpoint
  };
  return (
    <div
      className={`${classNames} relative flex flex-col items-center bg-radial-gradient p-[1px] rounded-lg`}
    >
      <textarea
        placeholder="How can Bolt help you today ?"
        className="focus:outline-none w-full h-full p-4 pr-16 resize-none text-sm placeholder:text-gray-500 bg-neutral-950 rounded-lg"
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter" && text.length !== 0) {
            handleTextAreaChange();
          }
        }}
      ></textarea>

      {/* push */}
      <div className="absolute top-4 right-4">
        <Button
          isIconOnly={true}
          radius="sm"
          size="md"
          color="primary"
          variant="solid"
          className={`${text.length !== 0 ? "" : "hidden"}`}
          onPress={handleTextAreaChange}
        >
          <FaArrowRight />
        </Button>
      </div>

      {/* file upload */}
      <div></div>
    </div>
  );
}

export default GradiantTextarea;
