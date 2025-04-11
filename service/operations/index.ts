import axios from "axios";
import { ENDPONT_URL } from "../api";
import { chatMessage } from "@/types/prompt";

export const fetchTemplate = async (prompt: string) => {
  try {
    const response = await axios.post(`${ENDPONT_URL.template}`, {
      prompt: prompt,
    });
    if (response.status !== 200) throw Error("Something went wrong");

    return response.data.prompts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchChat = async (messages: chatMessage[]) => {
  try {
    const messagesStr = JSON.stringify(messages);
    const response = await axios.post(`${ENDPONT_URL.chat}`, {
      messages: messagesStr,
    });
    if (response.status !== 200) throw Error("Something went wrong");
    return response.data.response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
