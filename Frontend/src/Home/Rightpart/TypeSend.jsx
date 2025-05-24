import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage";

function TypeSend() {
  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();    

    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[10vh] bg-gray-800 z-0">
        <div className="w-[70%] mx-4 z-10">
          <input
            type="text"
            placeholder="Type here"
            className="border border-gray-700 rounded-xl outline-none px-4 py-2 mt-2 w-full bg-gray-600 text-white"
            name="input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button className=" z-10">
          <IoSendSharp className="text-3xl cursor-pointer" />
        </button>
      </div>
    </form>
  );
}

export default TypeSend;
