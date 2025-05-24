import React, { useState } from "react";
import axios from "axios";
import UseConversation from "../zustand/UseConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectConversation } = UseConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/message/send/${selectConversation._id}`,
        { message },
        {
          withCredentials: true,
        }
      );
      setMessages([...messages, response.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };

  return {loading, sendMessage };
};

export default useSendMessage;
