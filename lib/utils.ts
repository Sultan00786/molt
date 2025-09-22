import { fetchTemplate } from "@/api-service/operations";
import { setTemplate } from "@/store/slices/codeSlice";
import { chatMessage } from "@/types/prompt";
import { Dispatch } from "@reduxjs/toolkit";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getNewChat(text:string, dispatch: Dispatch) {
  const templateResponse = await fetchTemplate(text);
    console.log(templateResponse);
    if (templateResponse == null) return;

    // todo hit chat endpoint
    const message: chatMessage[] = Object.values(templateResponse)
      .map((promt) => promt)
      .reverse()
      .map((promt) => ({
        role: "user",
        content: promt as string,
      }));
    console.log("message", message);
    // set template
    dispatch(setTemplate(message));
    
    // const chatResponse = await fetchChat(message);
    // console.log(chatResponse);
    // dispatch(setChatCode(chatResponse));
}