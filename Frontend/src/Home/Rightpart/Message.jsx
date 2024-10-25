import React from "react";

function Message({message}) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user.id; 
  const chatUser = itsMe? "chat-end": "chat-start";
  const chatColor = itsMe? "bg-blue-400": "bg-yellow-500";
  
  return (
    <>
      <div className="p-4">
        <div className={`chat ${chatUser}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>{message.message}</div>
        </div>
      </div>
    </>
  );
}

export default Message;
