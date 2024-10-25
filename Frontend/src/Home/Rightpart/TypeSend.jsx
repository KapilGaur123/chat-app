import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import UseConversation from "../../zustand/UseConversation";
import axios from "axios";

function TypeSend() {
  const { selectConversation } = UseConversation();

  const [message, setMessage] = useState('');
  // const [error, setError] = useState(null);

  const sendMessage = async () => {
    try {
      if (!message.trim()) {
        alert("type the message");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/message/send/${selectConversation._id}`,
        { message },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handelEnter = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    
    setMessage( e.target.value );
  };

  return (
    <>
      <div className="flex space-x-1 h-[10vh] bg-gray-800 z-0">
        <div className="w-[70%] mx-4 z-10">
          <input
            type="text"
            placeholder="Type here"
            className="border border-gray-700 rounded-xl outline-none px-4 py-2 mt-2 w-full bg-gray-600 text-white"
            name="input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handelEnter}
          />
        </div>
        <button className=" z-10">
          <IoSendSharp className="text-3xl cursor-pointer" />
        </button>
      </div>
    </>
  );
}

export default TypeSend;
