import React from "react";

function GradiantSpot() {
  return (
    <div>
      <div className="w-[1100px] h-[1200px] bg-gradiant-blue-spot-1 fixed -top-[10] -right-[20px] z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="w-[1100px] h-[700px] bg-gradiant-pink-spot-1 fixed -top-[40px] -left-[900px] z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="w-[1200px] h-[1300px] bg-gradiant-blue-spot-2 fixed -top-[80] -left-[850px] z-20 transform translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}

export default GradiantSpot;
