import { fetchTemplate } from "@/api-service/operations";
import { setChatCode, setWebcontainFiles } from "@/store/slices/codeSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { FileSystemTree } from "@webcontainer/api";
import { clsx, type ClassValue } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";
import { convertToWebcontainerFiles } from "./webContainer/covertWebcontainerFiles";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getNewChat(
  text: string,
  dispatch: Dispatch,
  navigate: AppRouterInstance
) {
  const templateResponse = await fetchTemplate(text);
  console.log(templateResponse);
  // todo hit chat endpoint
  if (templateResponse && templateResponse?.length > 0) {
    dispatch(setChatCode(templateResponse));
    const parseRes: FileSystemTree = convertToWebcontainerFiles(templateResponse);
    dispatch(setWebcontainFiles(parseRes));
    navigate.push("/project");
  } else {
    console.log("Generate file array has zero length");
  }

  // const chatResponse = await fetchChat(message);
  // console.log(chatResponse);
  // dispatch(setChatCode(chatResponse));
}
