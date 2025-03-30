import React from "react";

function GradiantSpot({classNames = "fixed"}:{classNames:string}) {
  return (
    <div className="">
      <div className={`w-[1100px] h-[1200px] bg-gradiant-blue-spot-1 ${classNames} -top-[10] -right-[20px] transform translate-x-1/2 -translate-y-1/2`}></div>
      <div className={`w-[1100px] h-[700px] bg-gradiant-pink-spot-1 ${classNames} -top-[40px] -left-[900px] transform translate-x-1/2 -translate-y-1/2`}></div>
      <div className={`w-[1200px] h-[1300px] bg-gradiant-blue-spot-2 ${classNames} -top-[80] -left-[850px] transform translate-x-1/2 -translate-y-1/2`}></div>
    </div>
  );
}

export default GradiantSpot;
