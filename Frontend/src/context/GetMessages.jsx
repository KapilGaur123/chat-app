import React, { useEffect, useState } from "react";
import UseConversation from "../zustand/UseConversation.jsx";
import axios from "axios";

function GetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectConversation } = UseConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);

      if (selectConversation && selectConversation._id) {
        
        try {
          const response = await axios.get(
            `http://localhost:3000/message/get/${selectConversation._id}`,
            {
              withCredentials: true,
            }
          );

          setMessages(response.data);
          
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };

    getMessage();
  }, [selectConversation, setMessages]);

  return {
    loading,
    messages,
  };
}

export default GetMessages;
