import React from "react";

function GradiantTextarea({ classNames = "" }: { classNames: string }) {
  return (
    <div
      className={`${classNames} flex flex-col items-center bg-radial-gradient p-[1px] rounded-lg relative`}
    >
      <textarea
        placeholder="How can Bolt help you today-?"
        className="focus:outline-none w-full h-full p-4 resize-none text-sm placeholder:text-gray-500 bg-neutral-950 rounded-lg"
      ></textarea>
      {/* file upload */}
      <div></div>
      {/* push */}
      <div></div>
      {/* Gradiants */}
      <div>
        {/* <div className=" w-[500] h-[500] absolute -bottom-24 right-36 bg-gradiant-blue-spot-2 bg-background"></div>
            <div></div> */}
      </div>
    </div>
  );
}

export default GradiantTextarea;
