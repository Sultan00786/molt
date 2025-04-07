import axios from "axios";
import { ENDPONT_URL } from "../api";

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
