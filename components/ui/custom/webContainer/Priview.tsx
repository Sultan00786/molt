"use client";
import { files } from "@/lib/temp";
import { convertToWebcontainerFiles } from "@/lib/webContainer/covertWebcontainerFiles";
import { runWebContainer } from "@/lib/webContainer/runWebContainer";
import { useAppSelector } from "@/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Priview() {
  const webcontainerUrl = useAppSelector((state) => state.code.webcontainUrl);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  console.log(webcontainerUrl);

  useEffect(() => {
    async function needToRunWebcontainer() {
      setIsLoading(true);
      const mountStructur = convertToWebcontainerFiles(files);
      console.log(mountStructur);
      await runWebContainer(mountStructur, dispatch);
      setIsLoading(false);
    }
    needToRunWebcontainer();
  }, []);

  return (
    <div className="h-full">
      <div className="flex-1 h-full overflow-y-auto ">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-richblack-100">Starting WebContainer...</p>
            </div>
          </div>
        ) : webcontainerUrl ? (
          <iframe
            src={webcontainerUrl}
            width={"100%"}
            height={"100%"}
            title="WebContainer Preview"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-center text-4xl font-bold text-richblack-100">
              Waiting for WebContainer URL...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Priview;
