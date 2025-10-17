"use client";
import { useAppSelector } from "@/store";
import React from "react";

function Priview({ isLoading }: { isLoading: boolean }) {
  const webcontainerUrl = useAppSelector((state) => state.code.webcontainUrl);
  console.log(webcontainerUrl);
  return (
    <div>
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-richblack-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-richblack-100">Starting WebContainer...</p>
            </div>
          </div>
        ) : webcontainerUrl && webcontainerUrl.length > 0 ? (
          <iframe
            src={
              "https://gqihe0qvkkdzfnah0h6udm3jh3nlo3-1tnf--5173--96435430.local-corp.webcontainer-api.io"
            }
            className="w-full h-full border-0"
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
