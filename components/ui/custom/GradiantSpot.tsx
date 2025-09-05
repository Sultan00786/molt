import React from "react";

function GradiantSpot({ classNames = "fixed" }: { classNames: string }) {
  return (
    <div className="">
      <div
        className={`bg-gradiant-blue-spot-1 -z-20 ${classNames} -top-[25px] right-[40px] transform translate-x-1/2 -translate-y-1/2`}
      ></div>
      <div
        className={`bg-gradiant-pink-spot-1 ${classNames} -top-[158px] -left-[78px] -z-10`}
      ></div>
      <div
        className={`w-[851px] h-[651px] bg-gradiant-blue-spot-2 ${classNames} -top-[390px] -left-[220px] -z-20`}
      ></div>
    </div>
  );
}

export default GradiantSpot;
