import React from "react";
import UseConversation from "../../zustand/UseConversation";

function ChatUser() {
  const {selectConversation} = UseConversation();
  console.log(selectConversation);
  
  return (
    <>
      <div className="flex space-x-3 items-center justify-center bg-gray-800 hover:bg-gray-700 duration-300 h-[12vh]">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h1 className="text-xl">kapil</h1>
          <span className="text-sm">offline</span>
        </div>
      </div>
    </>
  );
}

export default ChatUser;
