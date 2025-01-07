
import axios from "axios";
 
  const API_URL = import.meta.env.VITE_URL;
 
  export async function sendMsgToAI(question) {
    console.log(API_URL);
 
    const response = await axios({
      url: API_URL,
      method: "post",
      data: {
        contents: [
          {
            parts: [{ text: question }],
          },
        ],
      },
    });

    const result=response["data"]["candidates"][0]["content"]["parts"][0]["text"];
    
     return result;
  }
 


 
 